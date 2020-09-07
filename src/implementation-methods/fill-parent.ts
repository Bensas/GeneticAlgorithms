import { Character } from "../character";
import { eliteSelect } from "../selection-methods/elite-select";

export function fillParent(population: Character[], children: Character[], quantity: number): Character[] {
    let newGen: Character[] = [];
    if(quantity <= children.length){
        return eliteSelect(children, quantity);
    }
    newGen = children.concat(eliteSelect(population, quantity - children.length));
return newGen;
}