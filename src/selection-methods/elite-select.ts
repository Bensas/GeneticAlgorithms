import { Character} from "../character";

export function eliteSelect(population: Character[], quantity: number): Character[] {
  const orderedPop: Character[] = population.sort((c1, c2) => c2.getAptitude() - c1.getAptitude());
  let result: Character[] = [];
  for (let i = 0; i < quantity; i++){
    result.push(orderedPop[i % orderedPop.length]);
  }
  return result;
}