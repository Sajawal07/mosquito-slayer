import Phaser from 'phaser';
import UpgradeManager from '../managers/UpgradeManager.js';

export default class ShopScene extends Phaser.Scene {
    constructor() {
        super('ShopScene');
    }

    create() {
        // Semi-transparent background
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.8);

        this.add.text(400, 50, 'UPGRADE YOUR GEAR (V2)', {
            fontSize: '48px',
            fill: '#ffff00',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.coinText = this.add.text(400, 100, `COINS: ${UpgradeManager.coins}`, {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.createUpgradeItem(160, 'slapRadius', 'Bigger Slap', 'Increase your slap area');
        this.createUpgradeItem(240, 'slapSpeed', 'Faster Hands', 'Decrease slap recovery time');
        this.createUpgradeItem(320, 'rageResistance', 'Zen Mode', 'Lose sanity slower on misses');

        // Weapon Selection Section
        this.add.text(400, 390, 'EQUIP WEAPON:', {
            fontSize: '24px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const weapons = UpgradeManager.weapons;
        const spacing = 110;
        const startX = 400 - (weapons.length - 1) * spacing / 2;
        
        this.weaponSprites = [];

        weapons.forEach((weaponKey, index) => {
            const x = startX + index * spacing;
            const y = 460;
            
            const container = this.add.container(x, y);
            
            const sprite = this.add.sprite(0, 0, weaponKey).setScale(0.12);
            const label = this.add.text(0, 45, weaponKey.toUpperCase(), {
                fontSize: '14px',
                fill: '#ffffff'
            }).setOrigin(0.5);

            container.add([sprite, label]);
            
            // Highlight current weapon
            if (UpgradeManager.currentWeapon === weaponKey) {
                sprite.setTint(0xffff00);
                label.setStyle({ fill: '#ffff00', fontStyle: 'bold' });
            }

            sprite.setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                    UpgradeManager.currentWeapon = weaponKey;
                    this.updateWeaponSelection();
                })
                .on('pointerover', () => {
                    this.tweens.add({ targets: sprite, scale: 0.15, duration: 100 });
                })
                .on('pointerout', () => {
                    this.tweens.add({ targets: sprite, scale: 0.12, duration: 100 });
                });

            this.weaponSprites.push({ key: weaponKey, sprite, label });
        });

        const backButton = this.add.text(400, 550, 'BACK TO GAME', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#aa0000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        });
    }

    updateWeaponSelection() {
        this.weaponSprites.forEach(item => {
            if (item.key === UpgradeManager.currentWeapon) {
                item.sprite.setTint(0xffff00);
                item.label.setStyle({ fill: '#ffff00', fontStyle: 'bold' });
            } else {
                item.sprite.clearTint();
                item.label.setStyle({ fill: '#ffffff', fontStyle: 'normal' });
            }
        });
    }


    createUpgradeItem(y, key, title, desc) {
        const upgrade = UpgradeManager.upgrades[key];
        
        const container = this.add.container(400, y);
        
        const bg = this.add.rectangle(0, 0, 600, 80, 0x333333, 1).setOrigin(0.5);
        const name = this.add.text(-280, -20, title, { fontSize: '24px', fill: '#0f0', fontStyle: 'bold' });
        const description = this.add.text(-280, 10, desc, { fontSize: '16px', fill: '#ccc' });
        const costText = this.add.text(150, 0, `COST: ${upgrade.cost}`, { fontSize: '20px', fill: '#ff0' }).setOrigin(0, 0.5);
        
        const buyBtn = this.add.text(280, 0, 'BUY', {
            fontSize: '20px',
            fill: '#fff',
            backgroundColor: '#00aa00',
            padding: { x: 10, y: 5 }
        })
        .setOrigin(1, 0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            if (UpgradeManager.upgrade(key)) {
                this.coinText.setText(`COINS: ${UpgradeManager.coins}`);
                costText.setText(`COST: ${upgrade.cost}`);
                // Simple animation
                this.tweens.add({
                    targets: buyBtn,
                    scale: 1.2,
                    duration: 100,
                    yoyo: true
                });
            } else {
                // Flash red if can't afford
                this.tweens.add({
                    targets: costText,
                    alpha: 0,
                    duration: 100,
                    yoyo: true,
                    repeat: 3
                });
            }
        });

        container.add([bg, name, description, costText, buyBtn]);
    }
}
