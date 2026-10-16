import Phaser from 'phaser';
import UpgradeManager from '../managers/UpgradeManager.js';

export default class PlayerHand extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, UpgradeManager.currentWeapon);
        scene.add.existing(this);
        this.setDepth(100);
        this.setAlpha(0);
        this.setScale(0.3);
    }

    slap(x, y, callback) {
        this.setPosition(x, y);
        this.setAlpha(1);
        this.setScale(0.5);

        this.scene.tweens.add({
            targets: this,
            scale: 0.3,
            duration: 100,
            ease: 'Back.easeOut',
            onComplete: () => {
                // Collision check happens here or in GameScene
                if (callback) callback();
                
                this.scene.time.delayedCall(200, () => {
                    this.scene.tweens.add({
                        targets: this,
                        alpha: 0,
                        duration: 100
                    });
                });
            }
        });

        // Juice: Screen shake
        this.scene.cameras.main.shake(100, 0.005);
    }
}
