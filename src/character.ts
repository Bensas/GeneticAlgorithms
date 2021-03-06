import { CharacterClass } from "./character-classes/character-class";
import { Item } from "./items/item";
import { isNumber } from "util";

export const HEIGHT = 'height';
export const HELMET = 'helmet';
export const WEAPON = 'weapon';
export const BOOTS = 'boots';
export const GLOVES = 'gloves';
export const BREASTPLATE = 'breastplate';

export const MIN_HEIGHT = 1.3;
export const MAX_HEIGHT = 2.0;

export class Character {
  class: CharacterClass;
  genes: Map<string, number | Item>;

  // constructor(charClass?: CharacterClass, charGenes?)
  constructor(charClass: CharacterClass) {
    this.initGeneMap();
    this.class = charClass;
  }

  private initGeneMap(): void{
    this.genes = new Map();
    this.genes.set(HEIGHT, 0);
    this.genes.set(HELMET, <Item>{});
    this.genes.set(WEAPON, <Item>{});
    this.genes.set(BOOTS, <Item>{});
    this.genes.set(GLOVES, <Item>{});
    this.genes.set(BREASTPLATE, <Item>{});
  }

  public getAptitude(): number {
    return this.class.aptitudeFunction(this.getAttack(), this.getDefense());
  }

  private getStrength(){
    let suma: number = 0;
    this.genes.forEach((value, key) => {
      if (typeof value !== 'number')
        suma += Number(((<Item>value).strength));
    });
    let strength: number = 100 * Math.tanh(0.01 * suma);
    return strength;
  }

  private getHealth(){
    let suma: number = 0;
    this.genes.forEach((value, key) => {
      if (typeof value !== 'number')
        suma += Number((<Item>value).health);
    });
    let health: number = 100 * Math.tanh(0.01 * suma);
    return health;
  }

  private getAgility(){
    let suma: number = 0;
    this.genes.forEach((value, key) => {
      if (typeof value !== 'number')
        suma += Number((<Item>value).agility);
    });
    let agility: number = Math.tanh(0.01 * suma);
    return agility;
  }

  private getExp(){
    let suma: number = 0;
    this.genes.forEach((value, key) => {
      if (typeof value !== 'number')
        suma += Number((<Item>value).exp);
    });
    let strength: number = 0.6 * Math.tanh(0.01 * suma);
    return strength;
  }

  private getResistance(){
    let suma: number = 0;
    this.genes.forEach((value, key) => {
      if (typeof value !== 'number')
        suma += Number((<Item>value).resistance);
    });
    let strength: number = Math.tanh(0.01 * suma);
    return strength;
  }

  private getATM(){
    return 0.7 - Math.pow(3 * Number(this.genes.get(HEIGHT)) - 5, 4) + Math.pow(3 * Number(this.genes.get(HEIGHT)) - 5, 2) + Number(this.genes.get(HEIGHT))/4;
  }

  private getDFM(){
    return 1.9 + Math.pow(2.5 * Number(this.genes.get(HEIGHT)) - 4.16, 4) - Math.pow(2.5 * Number(this.genes.get(HEIGHT)) - 4.16, 2) - (3 * Number(this.genes.get(HEIGHT))) / 10;
  }

  getAttack(){
    return (this.getAgility() + this.getExp()) * this.getStrength() * this.getATM();
  }

  getDefense(){
    return (this.getResistance() + this.getExp()) * this.getHealth() * this.getDFM();
  }
}