// main.js
import { Pokemon, addLog } from './pokemon.js';

// Об'єднання трьох об'єктів з `Object.assign()`
const object1 = { attack: 10 };
const object2 = { defense: 5 };
const object3 = { speed: 7 };
const combinedObject = Object.assign({}, object1, object2, object3);
console.log("Combined Object with assign():", combinedObject);

// Об'єднання об'єктів зі spread оператором
const spreadCombinedObject = { ...object1, ...object2, ...object3 };
console.log("Combined Object with spread:", spreadCombinedObject);

const pikachu = new Pokemon({
    name: 'Pikachu',
    healthElement: document.getElementById('health1'),
    attackButton: document.getElementById('attack1'),
    specialButton: document.getElementById('special1'),
    quickAttackButton: document.getElementById('quick-attack1'),
    thunderboltButton: document.getElementById('thunderbolt1')
});

const charmander = new Pokemon({
    name: 'Charmander',
    healthElement: document.getElementById('health2'),
    attackButton: document.getElementById('attack2'),
    specialButton: document.getElementById('special2'),
    quickAttackButton: document.getElementById('quick-attack2'),
    emberButton: document.getElementById('ember2')
});

pikachu.enemy = charmander;
charmander.enemy = pikachu;

pikachu.attackButton.addEventListener('click', () => pikachu.battle());
pikachu.specialButton.addEventListener('click', () => pikachu.battle(true));
pikachu.quickAttackButton.addEventListener('click', () => pikachu.battle('Quick Attack'));
pikachu.thunderboltButton.addEventListener('click', () => pikachu.battle('Thunderbolt'));

charmander.attackButton.addEventListener('click', () => charmander.battle());
charmander.specialButton.addEventListener('click', () => charmander.battle(true));
charmander.quickAttackButton.addEventListener('click', () => charmander.battle('Quick Attack'));
charmander.emberButton.addEventListener('click', () => charmander.battle('Ember'));
