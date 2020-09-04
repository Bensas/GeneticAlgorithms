export abstract class CharacterClass {
  abstract aptitudeFunction: (attack: number, defense: number) => number;
}

export class Warrior extends CharacterClass {
  aptitudeFunction = (attack: number, defense: number) => 0.6 * attack + 0.6 * defense;
}

export class Archer extends CharacterClass {
  aptitudeFunction = (attack: number, defense: number) => 0.9 * attack + 0.1 * defense;
}

export class Tank extends CharacterClass {
  aptitudeFunction = (attack: number, defense: number) => 0.3 * attack + 0.8 * defense;
}

export class Spy extends CharacterClass {
  aptitudeFunction = (attack: number, defense: number) => 0.8 * attack + 0.3 * defense;
}