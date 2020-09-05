import { Character, MIN_HEIGHT, MAX_HEIGHT} from "../character";

export function uniformMultiGeneMutate(c: Character, mutationChance: number): Character {
  c.genes.forEach((value, key) => {
    if (Math.random() < mutationChance){
      if (key === 'height')
        c.genes.set('height', MIN_HEIGHT + Math.random() * (MAX_HEIGHT - MIN_HEIGHT));
      // else
      //   c.genes.set(key, allItems.getRandomItem(key))
    }
  });
  return c;
}