import { Character} from "../character";

export function rouletteSelect(population: Character[], quantity: number): Character[] {
  const totalApitutude: number = population.reduce((accum, current) => current.getAptitude() + accum, 0);
  const relativeAptitudes: number[] = population.map((character) => character.getAptitude() / totalApitutude);
  let result: Character[] = [];
  for (let i = 0; i < quantity; i++){
    const rand = Math.random();
    result.push(population[getRouletteIndex(relativeAptitudes, rand)]);
  }
  return result;
}

export function getRouletteIndex(rouletteBoard: number[], rand: number): number {
  if (rand > 1)
    return -1;
  let index: number = 0;
  let accum: number = 0;
  while (accum < rand) {
    accum += rouletteBoard[index++];
  }
  return index-1;
}