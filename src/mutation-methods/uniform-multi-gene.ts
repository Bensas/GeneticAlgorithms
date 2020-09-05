import { Character, MIN_HEIGHT, MAX_HEIGHT, HEIGHT} from "../character";
import { GeneticEngine } from "../genetic-engine";

export function uniformMultiGeneMutate(c: Character, mutationChance: number, geneticEngine: GeneticEngine): Character {
  c.genes.forEach((value, key) => {
    if (Math.random() < mutationChance){
      if (key === HEIGHT)
        c.genes.set(HEIGHT, MIN_HEIGHT + Math.random() * (MAX_HEIGHT - MIN_HEIGHT));
      else
        c.genes.set(key, geneticEngine.randomItem(key))
    }
  });
  return c;
}