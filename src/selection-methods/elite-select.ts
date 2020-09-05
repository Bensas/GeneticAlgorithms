import { Character} from "../character";

export function eliteSelect(population: Character[], quantity: number): Character[] {
  return population.sort((c1, c2) => c1.getAptitude() - c2.getAptitude()).splice(0, quantity);
}