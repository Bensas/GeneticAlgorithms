import { CharacterClass } from "./character-classes/character-class";
import { Item } from "./items/item";

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
}

export const NUMBER_OF_ALLELES = 6;