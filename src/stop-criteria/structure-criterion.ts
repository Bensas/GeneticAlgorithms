import { GeneticEngine } from "../genetic-engine";
import { Configuration } from "../configuration";
import { modeItem } from "../mode-item";

export function structureCriterion(geneticEngine: GeneticEngine): boolean {
    if(geneticEngine.metrics.modeFitness.length < geneticEngine.config.numberOfGenerations){
        return false;
    }
    let pos: number = geneticEngine.metrics.modeFitness.length - geneticEngine.config.numberOfGenerations;
    let arr: modeItem[] = geneticEngine.metrics.modeFitness.slice(pos);
    for(let i = 1; i < geneticEngine.config.numberOfGenerations; i++){
        if(arr[0].mode !== arr[i].mode || arr[0].percentage < geneticEngine.config.stopValue || arr[i].percentage < geneticEngine.config.stopValue){
            return false;
        }
    }
  return true;
}