import Phaser from 'phaser';

export default class Mosquito extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'circle');
        // Removed redundant add.existing/physics.add.existing as the group handles this
        this.setCircle(15);
        this.setBounce(1);
        this.setInteractive();
        
        // Flight physics
        this.baseSpeed = 200;
        this.difficultyMultiplier = 1;
        this.isEscaping = false;
        
        // this.play('fly');
        this.initMovement();
    }

    initMovement() {
        this.changeDirection();
        this.scene.time.addEvent({
            delay: Phaser.Math.Between(500, 2000),
            callback: this.changeDirection,
            callbackScope: this,
            loop: true
        });
    }

    changeDirection() {
        if (this.isEscaping) return;

        const angle = Phaser.Math.Between(0, 360);
        const speed = this.baseSpeed * this.difficultyMultiplier;
        this.scene.physics.velocityFromAngle(angle, speed, this.body.velocity);
        
        // Flip based on direction
        this.flipX = this.body.velocity.x < 0;
        
        // Tilt based on movement
        this.setAngle(this.body.velocity.x * 0.1);
    }

    update() {
        // Add some "jitter" to make it feel annoying
        this.x += Math.sin(this.scene.time.now * 0.01) * 2;
        this.y += Math.cos(this.scene.time.now * 0.01) * 2;
    }

    die() {
        this.disableBody(true, true);
        this.destroy();
    }
}
