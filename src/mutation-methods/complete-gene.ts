import { Character, MIN_HEIGHT, MAX_HEIGHT, HEIGHT, HELMET, BOOTS, GLOVES, BREASTPLATE, WEAPON} from "../character";
import { GeneticEngine } from "../genetic-engine";

export function completeGenMutate(c: Character, mutationChance: number, geneticEngine: GeneticEngine): Character {
    if(Math.random() < mutationChance){
        c = geneticEngine.freshCharacter();
    }
    return c;
}