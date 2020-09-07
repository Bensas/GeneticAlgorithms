import { Character} from "../character";
import { eliteSelect } from "./elite-select";
import { shuffle } from "./tournament-selection";


export function probabilisticTournamentSelect(population: Character[], quantity: number): Character[] {
  let result: Character[] = [];
  for (let i = 0; i < quantity; i++){
    const threshold: number = 0.5 + Math.random() * 0.5;
    let pool = shuffle(population).splice(0, 2); // Take 2 random individuals
    if (Math.random() < threshold)
      result.push(eliteSelect(pool, 1)[0]); // Select the most apt
    else
      result.push(eliteSelect(pool, 1)[1]); // Select the least apt
  }
  return result;
}