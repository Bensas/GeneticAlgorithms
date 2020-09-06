import { GeneticEngine } from "../genetic-engine";
import { Configuration } from "../configuration";
import { modeItem } from "../mode-item";

export function structureCriterion(geneticEngine: GeneticEngine): boolean {
    if(geneticEngine.metrics.modeFitness.length < geneticEngine.config.numberOfGenerations){
        return false;
    }
    let pos: number = geneticEngine.metrics.modeFitness.length - Math.floor(geneticEngine.config.stopValue * geneticEngine.metrics.modeFitness.length);
    let arr: modeItem[] = geneticEngine.metrics.modeFitness.slice();
  return true;
}