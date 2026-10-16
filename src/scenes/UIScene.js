import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create(data) {
        this.scoreText = this.add.text(20, 20, `SCORE: ${data.score}`, {
            fontSize: '24px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        });

        this.levelText = this.add.text(400, 20, `LEVEL: ${data.level}`, {
            fontSize: '24px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5, 0);

        this.rageLabel = this.add.text(780, 20, 'SANITY', {
            fontSize: '20px',
            fill: '#fff'
        }).setOrigin(1, 0);

        this.rageBarBack = this.add.graphics();
        this.rageBarBack.fillStyle(0x333333, 1);
        this.rageBarBack.fillRect(580, 50, 200, 20);

        this.rageBar = this.add.graphics();
        this.updateRageBar(data.rage);

        // Shop Button
        this.shopBtn = this.add.text(300, 560, '🛒 SHOP', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#0000ff',
            padding: { x: 10, y: 5 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.pause('GameScene');
            this.scene.launch('ShopScene');
        });

        this.pauseBtn = this.add.text(500, 560, '⏸ PAUSE', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#ffaa00',
            padding: { x: 10, y: 5 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.pause('GameScene');
            this.scene.launch('PauseScene');
        });

        // Listen to game scene events
        const gameScene = this.scene.get('GameScene');
        gameScene.events.on('updateScore', (score) => {
            if (this.scoreText) this.scoreText.setText(`SCORE: ${score}`);
        });

        gameScene.events.on('updateRage', (rage) => {
            this.updateRageBar(rage);
        });

        gameScene.events.on('updateLevel', (level) => {
            if (this.levelText) this.levelText.setText(`LVL: ${level}`);
        });
    }

    updateRageBar(rage) {
        this.rageBar.clear();
        const color = rage > 70 ? 0xff0000 : 0x00ff00;
        this.rageBar.fillStyle(color, 1);
        // Bar shows "Sanity" so 100% is good, 0% is game over. 
        // Or "Rage" where 100% is bad. Let's do Rage (higher is worse).
        this.rageBar.fillRect(580, 50, 200 * (rage / 100), 20);
    }
}
