export const INITIAL_ENEMIES = [
  {
    name: "Scrappy Goblin",
    type: "goblin",
    hp: 40, maxHp: 40,
    attack: 8,
    title: "Forest Pest",
    reward: "Your blade grows sharper. +3 ATK",
    atkBoost: 3,
    // special: 25% chance to dodge player attack entirely
    special: { id: 'dodge', chance: 0.25, label: '🌀 Dodged!' }
  },
  {
    name: "Goblin Shaman",
    type: "goblin-shaman",
    hp: 55, maxHp: 55,
    attack: 12,
    title: "Cursed Trickster",
    reward: "Battle hardened. +4 ATK",
    atkBoost: 4,
    // special: 20% chance to curse player (-3 ATK for the rest of this fight)
    special: { id: 'curse', chance: 0.20, label: '🔮 Cursed! -3 ATK' }
  },
  {
    name: "Iron Orc",
    type: "orc",
    hp: 75, maxHp: 75,
    attack: 16,
    title: "Brute Warrior",
    reward: "Fury unlocked. +5 ATK",
    atkBoost: 5,
    // special: 20% chance to self-buff (+4 ATK until dead)
    special: { id: 'rage', chance: 0.20, label: '😤 Enraged! +4 ATK' }
  },
  {
    name: "Orc Warlord",
    type: "orc-warlord",
    hp: 100, maxHp: 100,
    attack: 20,
    title: "Champion of Chaos",
    reward: "Champion's resolve. +6 ATK",
    atkBoost: 6,
    // special: 20% chance to strike twice in one turn
    special: { id: 'doublestrike', chance: 0.20, label: '⚡ Double Strike!' }
  },
  {
    name: "Inferno Dragon",
    type: "dragon",
    hp: 160, maxHp: 160,
    attack: 27,
    title: "Lord of Destruction",
    reward: null,
    atkBoost: 0,
    // special: 25% chance for fire breath — deals 150% dmg and can't be dodged
    special: { id: 'firebreath', chance: 0.25, label: '🔥 Fire Breath!' }
  }
];

export const INITIAL_PLAYER = {
  hp: 100,
  maxHp: 100,
  attack: 20,
  potions: 3
};

export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Returns true ~20% of the time */
export function isCrit() {
  return Math.random() < 0.2;
}

/** Returns true based on a given probability */
export function chance(p) {
  return Math.random() < p;
}
