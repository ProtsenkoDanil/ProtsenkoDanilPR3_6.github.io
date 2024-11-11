// pokemon.js

export class Pokemon {
    constructor({ name, healthElement, attackButton, specialButton, quickAttackButton, thunderboltButton }) {
        this.name = name;
        this.health = 100;
        this.healthElement = healthElement;
        this.attackButton = attackButton;
        this.specialButton = specialButton;
        this.quickAttackButton = quickAttackButton;
        this.thunderboltButton = thunderboltButton;
        this.enemy = null;

        // Поле attacks з новими атаками
        this.attacks = [
            { name: 'Quick Attack', minDamage: 5, maxDamage: 10, count: 3 },
            { name: 'Thunderbolt', minDamage: 15, maxDamage: 25, count: 1 }
        ];
    }

    getRandomAttack(attackName) {
        const attack = this.attacks.find(a => a.name === attackName && a.count > 0);
        if (attack) {
            attack.count--;
            return Math.floor(Math.random() * (attack.maxDamage - attack.minDamage + 1)) + attack.minDamage;
        }
        return 0;
    }

    updateHealthBar() {
        this.healthElement.style.width = this.health + '%';
        if (this.health <= 0) {
            this.health = 0;
            alert(`${this.name} has fainted!`);
        }
    }

    showPokeballAnimation() {
        const pokeball = document.getElementById('pokeball');
        const explosion = document.getElementById('explosion');

        const { top: attackerTop, left: attackerLeft } = this.attackButton.parentElement.getBoundingClientRect();
        const { top: targetTop, left: targetLeft } = this.enemy.attackButton.parentElement.getBoundingClientRect();

        pokeball.style.visibility = 'visible';
        pokeball.style.top = `${attackerTop}px`;
        pokeball.style.left = `${attackerLeft}px`;

        setTimeout(() => {
            pokeball.style.top = `${targetTop}px`;
            pokeball.style.left = `${targetLeft}px`;
        }, 50);

        setTimeout(() => {
            explosion.style.visibility = 'visible';
            explosion.style.top = `${targetTop}px`;
            explosion.style.left = `${targetLeft}px`;
            pokeball.style.visibility = 'hidden';
        }, 800);

        // Сховуємо вибух через деякий час
        setTimeout(() => {
            explosion.style.visibility = 'hidden';
        }, 1000);
    }

    battle(attackName = 'Attack') {
        if (window.isAttacking) return;
        window.isAttacking = true;

        this.showPokeballAnimation();

        let damage;
        if (attackName === 'Quick Attack' || attackName === 'Thunderbolt') {
            damage = this.getRandomAttack(attackName);
        } else {
            damage = Math.floor(Math.random() * 10) + 5; // Звичайна атака
        }
        this.enemy.health -= damage;
        if (this.enemy.health < 0) this.enemy.health = 0;

        this.enemy.updateHealthBar();
        addLog(`${this.name} used ${attackName} on ${this.enemy.name}. Damage: ${damage}. ${this.enemy.name} has ${this.enemy.health} HP left.`);

        setTimeout(() => (window.isAttacking = false), 1000);
    }
}

export const addLog = (message) => {
    const logs = document.getElementById('logs');
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logs.prepend(logEntry);
};
