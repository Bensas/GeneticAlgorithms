import { CharacterClass } from "./character-classes/character-class";
import { Item } from "./items/item";
import { isNumber } from "util";

export class Character {
  class: CharacterClass;
  genes: {
    height: number,
    helmet: Item,
    weapon: Item,
    boots: Item,
    gloves: Item,
    breastplate: Item
  }

  // constructor(charClass?: CharacterClass, charGenes?: )

  public getAptitude(): number {
    return this.class.aptitudeFunction(this.getAttack(), this.getDefense());
  }

  private getStrength(){
    var suma: number = this.genes.helmet.strength + this.genes.weapon.strength + this.genes.boots.strength + this.genes.gloves.strength + this.genes.breastplate.strength;
    var strength: number = 100 * Math.tanh(0.01 * suma);
    return strength;
  }

  private getHealth(){
    var suma: number = this.genes.helmet.health + this.genes.weapon.health + this.genes.boots.health + this.genes.gloves.health + this.genes.breastplate.health;
    var health: number = 100 * Math.tanh(0.01 * suma);
    return health;
  }

  private getAgility(){
    var suma: number = this.genes.helmet.agility + this.genes.weapon.agility + this.genes.boots.agility + this.genes.gloves.agility + this.genes.breastplate.agility;
    var agility: number = Math.tanh(0.01 * suma);
    return agility;
  }

  private getExp(){
    var suma: number = this.genes.helmet.exp + this.genes.weapon.exp + this.genes.boots.exp + this.genes.gloves.exp + this.genes.breastplate.exp;
    var strength: number = 0.6 * Math.tanh(0.01 * suma);
    return strength;
  }

  private getResistance(){
    var suma: number = this.genes.helmet.resistance + this.genes.weapon.resistance + this.genes.boots.resistance + this.genes.gloves.resistance + this.genes.breastplate.resistance;
    var strength: number = Math.tanh(0.01 * suma);
    return strength;
  }

  private getATM(){
    return 0.7 - Math.pow(3 * this.genes.height - 5, 4) + Math.pow(3 * this.genes.height - 5, 2) + this.genes.height/4;
  }

  private getDFM(){
    return 1.9 + Math.pow(2.5 * this.genes.height - 4.16, 4) - Math.pow(2.5 * this.genes.height - 4.16, 2) - (3 * this.genes.height) / 4;
  }

  getAttack(){
    return (this.getAgility() + this.getExp()) * this.getStrength() * this.getATM();
  }

  getDefense(){
    return (this.getResistance() + this.getExp()) * this.getHealth() * this.getDFM();
  }
}