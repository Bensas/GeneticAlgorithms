import { Character} from "../character";
import { rouletteSelect } from "./roulette-select";
import { GeneticEngine } from "../genetic-engine";

export function boltzmannSelect(population: Character[], quantity: number, geneticEngine: GeneticEngine): Character[] {
  let pseudoAptitudePopulation: Character[] = getBoltzmannAptitudePopulation(population, getBoltzmannTemperature(geneticEngine.metrics.generationNumber));
  return rouletteSelect(pseudoAptitudePopulation, quantity);
}

export function getBoltzmannAptitudePopulation(population: Character[], temperature: number): Character[] {
  const totalBoltzmann = population.reduce((accum, character) => accum + Math.pow(Math.E, (character.getAptitude() / temperature)), 0);
  return population.map((character, index) => {
                      const actualAptitude = character.getAptitude();
                      character.getAptitude = () => Math.pow(Math.E, (actualAptitude / temperature) / totalBoltzmann);
                      return character;
                    });
}

export function getBoltzmannTemperature(generationNumber: number): number {
  return 1/(0.002 * generationNumber + 1);
}