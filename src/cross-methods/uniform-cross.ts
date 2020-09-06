import { Character } from "../character";


export function uniformCross(c1: Character, c2: Character): Character[]{
  let firstChild: Character = new Character(c1.class);
  let secondChild: Character = new Character(c2.class);
  c1.genes.forEach((value, key) => {
    let swap = Math.random() > 0.5;
    firstChild.genes.set(key, swap ? (c2.genes.get(key) ?? 0) : value);
    secondChild.genes.set(key, swap? value : (c2.genes.get(key) ?? 0));
  });
  return [firstChild, secondChild];
}