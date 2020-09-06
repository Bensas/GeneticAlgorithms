import { Character } from "../character";

export function twoPointCross(c1: Character, c2: Character): Character[]{
  let firstChild: Character = new Character(c1.class);
  let secondChild: Character = new Character(c2.class);
  let locus: number = Math.floor(Math.random()*(c1.genes.keys.length));
  let locus2: number = Math.floor(Math.random()*(c1.genes.keys.length - locus) + locus);
  let i: number = 0;
  let swap: boolean = false;
  c1.genes.forEach((value, key) => {
    swap = false;
    if(i >= locus && i <= locus2){
        swap = true;
    } 
    firstChild.genes.set(key, swap ? (c2.genes.get(key) ?? 0) : value);
    secondChild.genes.set(key, swap ? value : (c2.genes.get(key) ?? 0));
    i++;
  });
  return [firstChild, secondChild];
}