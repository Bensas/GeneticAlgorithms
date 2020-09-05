import { Character, MIN_HEIGHT, MAX_HEIGHT, HEIGHT, HELMET, BOOTS, GLOVES, BREASTPLATE, WEAPON} from "../character";
import { GeneticEngine } from "../genetic-engine";

export function oneGenMutate(c: Character, mutationChance: number, geneticEngine: GeneticEngine): Character {
    if(Math.random() < mutationChance){
        let sorteo: number = Math.floor(Math.random()*(6));
        let type: string[] = [HEIGHT,HELMET,BOOTS,GLOVES,BREASTPLATE,WEAPON];
        let palabra: string = type[sorteo];
        if (palabra === HEIGHT)
            c.genes.set(palabra, MIN_HEIGHT + Math.random() * (MAX_HEIGHT - MIN_HEIGHT));
        else
            c.genes.set(palabra, geneticEngine.randomItem(palabra));
    }
    return c;
}