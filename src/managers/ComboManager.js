class ComboManager {
    constructor() {
        this.combo = 0;
        this.multiplier = 1;
        this.lastKillTime = 0;
        this.comboWindow = 2000; // 2 seconds to keep combo
    }

    onKill() {
        const now = Date.now();
        if (now - this.lastKillTime < this.comboWindow) {
            this.combo++;
        } else {
            this.combo = 1;
        }
        
        this.lastKillTime = now;
        this.multiplier = Math.floor(this.combo / 5) + 1;
        
        return {
            combo: this.combo,
            multiplier: this.multiplier
        };
    }

    reset() {
        this.combo = 0;
        this.multiplier = 1;
    }
}

export default new ComboManager();
