import Phaser from 'phaser';
import UpgradeManager from '../managers/UpgradeManager.js';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const bg = this.add.image(400, 300, 'background').setAlpha(0.5);
        const scaleX = 800 / bg.width;
        const scaleY = 600 / bg.height;
        const scale = Math.max(scaleX, scaleY);
        bg.setScale(scale);

        const title = this.add.text(400, 150, 'MOSQUITO SLAYER', {
            fontSize: '64px',
            fill: '#ff0000',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        // Simple bounce animation for title
        this.tweens.add({
            targets: title,
            y: 170,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            loop: -1
        });

        const playButton = this.add.text(400, 400, 'START HUNTING', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#00aa00',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start('GameScene'))
        .on('pointerover', () => playButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => playButton.setStyle({ fill: '#fff' }));
    }
}

