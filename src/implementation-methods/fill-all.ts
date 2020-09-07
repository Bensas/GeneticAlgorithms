import { Character } from "../character";
import { eliteSelect } from "../selection-methods/elite-select";

export function fillAll(population: Character[], children: Character[], quantity: number): Character[] {
    let newGen: Character[] = eliteSelect(population.concat(children), quantity);
  return newGen;
}