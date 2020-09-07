import { Character} from "../character";
import { eliteSelect } from "./elite-select";


export function tournamentSelect(population: Character[], quantity: number): Character[] {
  let result: Character[] = [];
  const m: number = quantity/4;
  for (let i = 0; i < quantity; i++){
    let pool = shuffle(population).splice(0, m);
    result.push(eliteSelect(pool, 1)[0]);
  }
  return result;
}

export function shuffle(input: any[]): any[] {
  let array = input.slice();
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}