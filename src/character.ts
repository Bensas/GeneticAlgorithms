import { CharacterClass } from "./character-classes/character-class";
import { Item } from "./items/item";

export interface Character {
  class: CharacterClass,
  height: number,
  helmet: Item,
  weapon: Item,
  boots: Item,
  bloves: Item,
  chestPlate: Item
}