import { Character} from "../character";
import { getRouletteIndex } from "./roulette-select";

export function rouletteSelect(population: Character[], quantity: number): Character[] {
  const totalApitutude: number = population.reduce((accum, current) => current.getAptitude() + accum, 0);
  const relativeAptitudes: number[] = population.map((character) => character.getAptitude() / totalApitutude);
  let result: Character[] = [];
  for (let i = 0; i < quantity; i++){
    const rand = (Math.random() + i) / quantity;
    result.push(population[getRouletteIndex(relativeAptitudes, rand)]);
  }
  return result;
}