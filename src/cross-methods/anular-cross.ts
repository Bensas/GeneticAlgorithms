import { Character } from "../character";

export function AnularCross(c1: Character, c2: Character): Character[]{
  let firstChild: Character = new Character(c1.class);
  let secondChild: Character = new Character(c2.class);
  let locus: number = Math.floor(Math.random()*(c1.genes.keys.length));
  let locus2: number = Math.floor(Math.random()*(c1.genes.keys.length));
  let numOfGenes: number = Math.floor(Math.random()*(c1.genes.keys.length/2)) + 1;
  let i: number = 0;
  let swap: boolean = false;
  let flag: boolean = false;
  if((locus + numOfGenes) > c1.genes.keys.length){
    locus2 = (locus + numOfGenes) % c1.genes.keys.length;
    flag = true;
  }
  c1.genes.forEach((value, key) => {
    swap = false;
    if((i >= locus && numOfGenes > 0) || (flag && i < locus2)){
        swap = true;
        numOfGenes--;
    }
    firstChild.genes.set(key, swap ? (c2.genes.get(key) ?? 0) : value);
    secondChild.genes.set(key, swap ? value : (c2.genes.get(key) ?? 0));
    i++;
  });
  return [firstChild, secondChild];
}