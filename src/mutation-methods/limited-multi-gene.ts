import { Character, MIN_HEIGHT, MAX_HEIGHT, HEIGHT, HELMET, BOOTS, GLOVES, BREASTPLATE, WEAPON} from "../character";
import { GeneticEngine } from "../genetic-engine";

export function limitedMultiGenMutate(c: Character, mutationChance: number, geneticEngine: GeneticEngine): Character {
    if(Math.random() < mutationChance){    
        let numOfGenes: number = Math.floor(Math.random()*(c.genes.keys.length)+1);
        let type: string[] = [HEIGHT,HELMET,BOOTS,GLOVES,BREASTPLATE,WEAPON];
        let max: number = c.genes.keys.length;
        for(let i = 0; i < numOfGenes; i++){
            let sorteo: number = Math.floor(Math.random()*max);
            let palabra: string = type[sorteo];
            if (palabra === HEIGHT)
                c.genes.set(palabra, MIN_HEIGHT + Math.random() * (MAX_HEIGHT - MIN_HEIGHT));
            else
                c.genes.set(palabra, geneticEngine.randomItem(palabra));
            max--;
            type.slice(sorteo, 1);
        }
    }
    return c;
}