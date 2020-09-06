import { Character} from "../character";

export function eliteSelect(population: Character[], quantity: number): Character[] {
  return population.sort((c1, c2) => c2.getAptitude() - c1.getAptitude()).splice(0, quantity);
}