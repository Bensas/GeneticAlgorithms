import { Character } from "../character";
import { eliteSelect } from "../selection-methods/elite-select";
import { Configuration } from "../configuration";
import { GeneticEngine } from "../genetic-engine";

export function fillParent(population: Character[], children: Character[], quantity: number, config: Configuration, engine: GeneticEngine): Character[] {
    let newGen: Character[] = [];
    if(quantity <= children.length){
        config.replacementMethods.forEach((method, index) => {
            newGen.push(...method(children, Math.round(quantity * config.replacementQuantities[index]), engine))
        });
        console.log( quantity + ' - ' + newGen.length);
        return newGen;
    }
    config.replacementMethods.forEach((method, index) => {
        newGen.push(...method(population, Math.round((quantity-children.length) * config.replacementQuantities[index]), engine))
    });
    console.log( quantity + ' - ' + newGen.length);
    return children.concat(newGen);
}