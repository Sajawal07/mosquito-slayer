import Phaser from 'phaser';

export default class ParticleManager {
    constructor(scene) {
        this.scene = scene;
        
        // Blood splat emitter (simple red circles)
        this.bloodEmitter = this.scene.add.particles(0, 0, 'blood', {
            speed: { min: 100, max: 300 },
            scale: { start: 0.1, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 500,
            gravityY: 500,
            blendMode: 'NORMAL',
            emitting: false
        });

        // Dust/Smoke emitter (for misses)
        this.smokeEmitter = this.scene.add.particles(0, 0, 'smoke', {
            speed: { min: 20, max: 100 },
            scale: { start: 0.2, end: 0.5 },
            alpha: { start: 0.5, end: 0 },
            lifespan: 800,
            rotate: { min: 0, max: 360 },
            emitting: false
        });

        // Spark emitter (for hits)
        this.sparkEmitter = this.scene.add.particles(0, 0, 'spark', {
            speed: { min: 150, max: 400 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.4, end: 0 },
            lifespan: 300,
            gravityY: 200,
            blendMode: 'ADD',
            emitting: false
        });
    }

    createBloodBurst(x, y) {
        this.bloodEmitter.emitParticleAt(x, y, 15);
    }

    createSmokePuff(x, y) {
        this.smokeEmitter.emitParticleAt(x, y, 10);
    }

    createSparkBurst(x, y) {
        this.sparkEmitter.emitParticleAt(x, y, 20);
    }
}
