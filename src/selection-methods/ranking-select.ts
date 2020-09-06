import { Character} from "../character";
import { rouletteSelect } from "./roulette-select";

export function rankingSelect(population: Character[], quantity: number): Character[] {
  let pseudoAptitudePopulation: Character[] = getPseudoAptitudePopulation(population);
  return rouletteSelect(pseudoAptitudePopulation, quantity);
}

export function getPseudoAptitudePopulation(population: Character[]): Character[] {
  return population.sort((c1, c2) => c2.getAptitude() - c1.getAptitude())
                    .map((character, index) => {
                      character.getAptitude = () => index + 1;
                      return character;
                    });
}