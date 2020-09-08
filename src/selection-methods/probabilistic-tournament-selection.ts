import { Character} from "../character";
import { eliteSelect } from "./elite-select";
import { shuffle } from "./tournament-selection";


export function probabilisticTournamentSelect(population: Character[], quantity: number): Character[] {
  console.log(population.length);

  let result: Character[] = [];
  for (let i = 0; i < quantity; i++){
    const threshold: number = 0.5 + Math.random() * 0.5;
    let pool = shuffle(population).splice(0, 2); // Take 2 random individuals
    console.log(pool.length);
    if (Math.random() < threshold)
      result.push(eliteSelect(pool, 2)[0]); // Select the most apt
    else
      result.push(eliteSelect(pool, 2)[1]); // Select the least apt
    console.log('dsf');
    console.log(eliteSelect(pool, 1));
  }
  console.log(population.length);
  // console.log(result.length)
  return result;
}