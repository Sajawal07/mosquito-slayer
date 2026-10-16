class DifficultyManager {
    constructor() {
        this.level = 1;
        this.baseSpeed = 200;
        this.baseSpawnRate = 2000;
        this.helpFactor = 0; // Secretly help struggling players
    }

    getMosquitoStats() {
        // Controlled frustration: Speed doesn't just go up, it zig-zags
        const speed = this.baseSpeed + (this.level * 15) - (this.helpFactor * 20);
        const spawnRate = Math.max(400, this.baseSpawnRate - (this.level * 100));
        
        return {
            speed: speed,
            spawnRate: spawnRate,
            zigZagFrequency: Math.min(0.5, 0.1 + (this.level * 0.05))
        };
    }

    recordFail() {
        this.helpFactor = Math.min(5, this.helpFactor + 1);
    }

    recordSuccess() {
        this.helpFactor = Math.max(0, this.helpFactor - 0.5);
    }

    nextLevel() {
        this.level++;
        this.helpFactor = 0; // Reset help on new level
    }
}

export default new DifficultyManager();
