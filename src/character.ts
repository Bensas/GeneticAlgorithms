import { CharacterClass } from "./character-classes/character-class";
import { Item } from "./items/item";
import { isNumber } from "util";

const HEIGHT = 'HEIGHT';
const HELMET = 'helmet';
const WEAPON = 'weapon';
const BOOTS = 'boots';
const GLOVES = 'gloves';
const BREASTPLATE = 'breastplate';

export class Character {
  class: CharacterClass;
  genes: Map<string, number | Item>;

  // constructor(charClass?: CharacterClass, charGenes?)
  constructor() {
    this.genes = new Map();
  }

  public getAptitude(): number {
    return this.class.aptitudeFunction(this.getAttack(), this.getDefense());
  }

  private getStrength(){
    let suma: number = 0;
    this.genes.forEach((value, key) => {
      if (typeof value !== 'number')
        suma += (<Item>value).strength;
    });
    var strength: number = 100 * Math.tanh(0.01 * suma);
    return strength;
  }

  private getHealth(){
    let suma: number = 0;
    this.genes.forEach((value, key) => {
      if (typeof value !== 'number')
        suma += (<Item>value).health;
    });
    var health: number = 100 * Math.tanh(0.01 * suma);
    return health;
  }

  private getAgility(){
    let suma: number = 0;
    this.genes.forEach((value, key) => {
      if (typeof value !== 'number')
        suma += (<Item>value).agility;
    });
    var agility: number = Math.tanh(0.01 * suma);
    return agility;
  }

  private getExp(){
    let suma: number = 0;
    this.genes.forEach((value, key) => {
      if (typeof value !== 'number')
        suma += (<Item>value).exp;
    });
    var strength: number = 0.6 * Math.tanh(0.01 * suma);
    return strength;
  }

  private getResistance(){
    let suma: number = 0;
    this.genes.forEach((value, key) => {
      if (typeof value !== 'number')
        suma += (<Item>value).resistance;
    });
    var strength: number = Math.tanh(0.01 * suma);
    return strength;
  }

  private getATM(){
    return 0.7 - Math.pow(3 * <number>this.genes.get(HEIGHT) - 5, 4) + Math.pow(3 * <number>this.genes.get(HEIGHT) - 5, 2) + <number>this.genes.get(HEIGHT)/4;
  }

  private getDFM(){
    return 1.9 + Math.pow(2.5 * <number>this.genes.get(HEIGHT) - 4.16, 4) - Math.pow(2.5 * <number>this.genes.get(HEIGHT) - 4.16, 2) - (3 * <number>this.genes.get(HEIGHT)) / 4;
  }

  getAttack(){
    return (this.getAgility() + this.getExp()) * this.getStrength() * this.getATM();
  }

  getDefense(){
    return (this.getResistance() + this.getExp()) * this.getHealth() * this.getDFM();
  }
}