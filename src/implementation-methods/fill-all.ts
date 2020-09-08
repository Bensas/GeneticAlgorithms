import { Character } from "../character";
import { eliteSelect } from "../selection-methods/elite-select";
import { Configuration } from "../configuration";
import { GeneticEngine } from "../genetic-engine";

export function fillAll(population: Character[], children: Character[], quantity: number, config: Configuration, engine: GeneticEngine): Character[] {
  let result: Character[] = [];
  config.replacementMethods.forEach((method, index) => {
    result.push(...method(population.concat(children), Math.round(quantity * config.replacementQuantities[index]), engine))
  });
  console.log( quantity + ' - ' + result.length);
  return result;
}