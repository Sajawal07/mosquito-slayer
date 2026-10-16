class UpgradeManager {
    constructor() {
        this.coins = 0;
        this.currentWeapon = 'hand';
        this.weapons = ['hand', 'pillow', 'racket', 'slipper', 'newspaper'];
        this.upgrades = {
            slapRadius: { level: 1, base: 50, scale: 10, cost: 100 },
            slapSpeed: { level: 1, base: 100, scale: -5, cost: 150 },
            rageResistance: { level: 1, base: 1.0, scale: -0.1, cost: 200 }
        };
    }

    addCoins(amount) {
        this.coins += amount;
    }

    getStat(key) {
        const up = this.upgrades[key];
        return up.base + (up.level - 1) * up.scale;
    }

    upgrade(key) {
        const up = this.upgrades[key];
        if (this.coins >= up.cost) {
            this.coins -= up.cost;
            up.level++;
            up.cost *= 2;
            return true;
        }
        return false;
    }
}

export default new UpgradeManager();
