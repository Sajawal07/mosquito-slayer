import Phaser from 'phaser';
import Mosquito from '../objects/Mosquito.js';
import PlayerHand from '../objects/PlayerHand.js';
import DifficultyManager from '../managers/DifficultyManager.js';
import ComboManager from '../managers/ComboManager.js';
import UpgradeManager from '../managers/UpgradeManager.js';
import AudioManager from '../managers/AudioManager.js';
import ParticleManager from '../managers/ParticleManager.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.isGameOver = false;
        this.isSlapping = false;
        this.score = 0;
        this.level = 1;
        this.rage = 0;
        
        // Layout - Simple Background for Testing
        this.add.rectangle(400, 300, 800, 600, 0x1a472a); // Dark Green background

        // Particle Manager
        this.particles = new ParticleManager(this);
        
        // Groups
        this.mosquitoes = this.physics.add.group({
            classType: Mosquito
        });

        // Environment Objects (Interactive placeholders)
        this.envObjects = this.add.group();
        
        const tv = this.add.rectangle(600, 200, 150, 100, 0x333333).setInteractive();
        tv.name = 'TV';
        
        const lamp = this.add.circle(150, 400, 30, 0xffff00).setInteractive();
        lamp.name = 'LAMP';
        
        const bed = this.add.rectangle(400, 500, 400, 150, 0x8b4513).setInteractive();
        bed.name = 'BED';

        this.envObjects.addMultiple([tv, lamp, bed]);

        // Hand
        this.hand = new PlayerHand(this);

        // UI Scene
        this.scene.launch('UIScene', { score: this.score, rage: this.rage, level: this.level });

        // Input
        this.input.on('pointerdown', (pointer) => {
            if (this.isGameOver) return;
            this.handleSlap(pointer.x, pointer.y);
        });

        // Spawning
        this.spawnTimer = this.time.addEvent({
            delay: 2000,
            callback: this.spawnMosquito,
            callbackScope: this,
            loop: true
        });

        this.events.on('resume', () => {
            if (this.hand) {
                this.hand.setTexture(UpgradeManager.currentWeapon);
            }
        });

        this.spawnMosquito();
    }

    spawnMosquito() {
        if (this.isGameOver) return;
        
        const stats = DifficultyManager.getMosquitoStats();
        const x = Phaser.Math.Between(100, 700);
        const y = Phaser.Math.Between(100, 500);
        
        // Random variety
        const key = Phaser.Math.RND.pick(['mosquito_1', 'mosquito_2']);
        const m = new Mosquito(this, x, y, key);
        m.baseSpeed = stats.speed;
        this.mosquitoes.add(m);
        
        AudioManager.play('buzz', 0.2 + (this.rage / 200));
    }

    handleSlap(x, y) {
        this.isSlapping = true;
        let hit = false;
        const radius = UpgradeManager.getStat('slapRadius');
        
        this.hand.slap(x, y, () => {
            try {
                // Safety check
                if (!this.sys.isActive()) return;

                const mosquitoes = this.mosquitoes.getChildren();
                for (let i = mosquitoes.length - 1; i >= 0; i--) {
                    const m = mosquitoes[i];
                    if (!m.active) continue;
                    
                    const dist = Phaser.Math.Distance.Between(x, y, m.x, m.y);
                    if (dist < radius) {
                        this.killMosquito(m);
                        hit = true;
                    }
                }

                if (!hit) {
                    this.handleMiss(x, y);
                } else {
                    // AudioManager.play('slap');
                }
            } catch (e) {
                console.error("Slap interaction error:", e);
            }
        });

        // Unlock slap after animation
        this.time.delayedCall(300, () => {
            this.isSlapping = false;
        });
    }

    killMosquito(mosquito) {
        try {
            if (!mosquito || !mosquito.active || !mosquito.body || !mosquito.body.enable) return;
            
            mosquito.die();
            const comboData = ComboManager.onKill();
            const points = 10 * comboData.multiplier;
            this.score += points;
            UpgradeManager.addCoins(points);
            
            DifficultyManager.recordSuccess();
            this.events.emit('updateScore', this.score);
            
            // Juice: Floating text
            this.showFloatingText(mosquito.x, mosquito.y, `+${points}`);

            // Particles (Safe check)
            if (this.particles && this.particles.createBloodBurst) {
                this.particles.createBloodBurst(mosquito.x, mosquito.y);
            }
        } catch (e) {
            console.error("CRASH IN KILLMOSQUITO:", e);
        }
    }

    showFloatingText(x, y, text) {
        const txt = this.add.text(x, y, text, {
            fontSize: '24px',
            fill: '#ffff00',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.tweens.add({
            targets: txt,
            y: y - 100,
            alpha: 0,
            scale: 2,
            duration: 800,
            onComplete: () => txt.destroy()
        });
    }

    handleMiss(x, y) {
        const resistance = UpgradeManager.getStat('rageResistance');
        this.rage += 10 * resistance;
        ComboManager.reset();
        DifficultyManager.recordFail();
        
        this.events.emit('updateRage', this.rage);
        // AudioManager.play('miss');

        // Check if we hit an environment object
        let hitObj = null;
        this.envObjects.getChildren().forEach(obj => {
            if (obj.getBounds().contains(x, y)) {
                hitObj = obj;
            }
        });

        if (this.rage >= 100) {
            this.gameOver();
        }

        // Destruction System: Randomly spawn "broken" objects or funny text
        const funnyFails = [
            { text: 'BROKE THE TV!', color: '#ff0000', shake: 10, target: 'TV' },
            { text: 'WOKE UP DAD!', color: '#ffaa00', shake: 15, target: 'BED' },
            { text: 'LAMP SMASHED!', color: '#ffff00', shake: 8, target: 'LAMP' },
            { text: 'STUPID FLY!', color: '#ffffff', shake: 5 },
            { text: 'MY PIZZA!', color: '#ff5500', shake: 12 },
            { text: 'WALL CRACK!', color: '#888888', shake: 3 }
        ];
        
        let fail = Phaser.Utils.Array.GetRandom(funnyFails);
        if (hitObj) {
            // Find a specific fail text for this object if available
            const specificFail = funnyFails.find(f => f.target === hitObj.name);
            if (specificFail) fail = specificFail;

            // Animate the object
            this.tweens.add({
                targets: hitObj,
                x: hitObj.x + Phaser.Math.Between(-10, 10),
                y: hitObj.y + Phaser.Math.Between(-10, 10),
                duration: 50,
                yoyo: true,
                repeat: 5
            });
        }

        const crack = this.add.text(x, y, fail.text, { 
            fontSize: '32px', 
            fill: fail.color,
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: crack,
            alpha: 0,
            y: y - 80,
            scale: 2,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => crack.destroy()
        });

        // Visual distortion (Juice)
        this.cameras.main.shake(fail.shake * 20, 0.01);
        this.cameras.main.flash(200, 255, 0, 0, 0.2);
        
        // Smoke puff on miss
        this.particles.createSmokePuff(x, y);
    }



    gameOver() {
        this.isGameOver = true;
        this.physics.pause();
        this.spawnTimer.remove();
        
        // Darken screen
        const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);
        overlay.setDepth(200);

        const container = this.add.container(400, 300).setDepth(201);

        const title = this.add.text(0, -100, 'OUT OF SANITY!', {
            fontSize: '64px',
            fill: '#ff0000',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5);

        const scoreText = this.add.text(0, 0, `FINAL SCORE: ${this.score}`, {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const levelText = this.add.text(0, 50, `SURVIVED TO LEVEL: ${this.level}`, {
            fontSize: '24px',
            fill: '#aaaaaa'
        }).setOrigin(0.5);

        const restartBtn = this.add.text(0, 150, 'RETRY HUNT', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#aa0000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.restart());

        const menuBtn = this.add.text(0, 230, 'MAIN MENU', {
            fontSize: '20px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.stop('UIScene');
            this.scene.start('MenuScene');
        });

        container.add([title, scoreText, levelText, restartBtn, menuBtn]);
        
        // Animate entrance
        container.setScale(0);
        this.tweens.add({
            targets: container,
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut'
        });

        AudioManager.play('panic'); // Play some chaotic end sound
    }

    update() {
        if (this.isGameOver) return;

        // Manual update for mosquitoes
        this.mosquitoes.getChildren().forEach(m => {
            if (m.active) m.update();
        });

        // Difficulty increase
        if (this.score >= this.level * 100) {
            this.level++;
            DifficultyManager.nextLevel();
            this.events.emit('updateLevel', this.level);
            
            const stats = DifficultyManager.getMosquitoStats();
            if (this.spawnTimer) {
                this.spawnTimer.delay = stats.spawnRate;
            }
        }
    }
}
