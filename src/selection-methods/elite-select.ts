import { Character} from "../character";

export function eliteSelect(population: Character[], quantity: number): Character[] {
  const aptituteFunction = population[0].class.aptitudeFunction;
  // return population.sort((c1, c2) => aptituteFunction(c1.getAttack(), c1.getDefens).splice(0, quantity);
  return population.splice(0, quantity);
}