import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Load images
        this.load.image('background', 'assets/images/background.png');
        this.load.image('mosquito_1', 'assets/images/mosquito_1.png');
        this.load.image('mosquito_2', 'assets/images/mosquito_2.png');
        this.load.image('hand', 'assets/images/hand.png');
        this.load.image('pillow', 'assets/images/pillow.png');
        this.load.image('racket', 'assets/images/racket.png');
        this.load.image('slipper', 'assets/images/slipper.png');
        this.load.image('newspaper', 'assets/images/newspaper.png');
        
        // Fallback for old key
        this.load.image('mosquito', 'assets/images/mosquito_1.png');

        // Create Animations
        this.load.on('complete', () => {
            this.anims.create({
                key: 'fly',
                frames: [
                    { key: 'mosquito_1' },
                    { key: 'mosquito_2' }
                ],
                frameRate: 15,
                repeat: -1
            });
        });

        // Add a loading text
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // Progress bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            this.createTextures();
            this.scene.start('MenuScene');
        });
    }

    createTextures() {
        // Spark
        const spark = this.make.graphics({ x: 0, y: 0, add: false });
        spark.fillStyle(0xffffff, 1);
        spark.fillCircle(4, 4, 4);
        spark.generateTexture('spark', 8, 8);

        // Blood
        const blood = this.make.graphics({ x: 0, y: 0, add: false });
        blood.fillStyle(0xff0000, 1);
        blood.fillCircle(8, 8, 8);
        blood.generateTexture('blood', 16, 16);

        // Smoke
        const smoke = this.make.graphics({ x: 0, y: 0, add: false });
        smoke.fillStyle(0xaaaaaa, 0.5);
        smoke.fillCircle(16, 16, 16);
        smoke.generateTexture('smoke', 32, 32);

        // Debug Circle (Mosquito placeholder)
        const debugCircle = this.make.graphics({ x: 0, y: 0, add: false });
        debugCircle.fillStyle(0xffffff, 1);
        debugCircle.lineStyle(2, 0x000000);
        debugCircle.fillCircle(15, 15, 15);
        debugCircle.strokeCircle(15, 15, 15);
        debugCircle.generateTexture('circle', 30, 30);
    }
}
