export abstract class CharacterClass {
  abstract aptitude: (attack: number, defense: number) => number;
}

export class Warrior extends CharacterClass {
  aptitude = (attack: number, defense: number) => 0.6 * attack + 0.6 * defense;
}

export class Archer extends CharacterClass {
  aptitude = (attack: number, defense: number) => 0.9 * attack + 0.1 * defense;
}

export class Tank extends CharacterClass {
  aptitude = (attack: number, defense: number) => 0.3 * attack + 0.8 * defense;
}

export class Spy extends CharacterClass {
  aptitude = (attack: number, defense: number) => 0.8 * attack + 0.3 * defense;
}