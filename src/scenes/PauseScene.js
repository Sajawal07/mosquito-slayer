import Phaser from 'phaser';

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
    }

    create() {
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);

        this.add.text(400, 250, 'PAUSED', {
            fontSize: '64px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const resumeBtn = this.add.text(400, 350, 'RESUME', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#00aa00',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        });

        const menuBtn = this.add.text(400, 450, 'MAIN MENU', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#666',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.stop('GameScene');
            this.scene.stop('UIScene');
            this.scene.start('MenuScene');
        });
    }
}
