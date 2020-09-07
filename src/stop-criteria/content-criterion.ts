import { GeneticEngine } from "../genetic-engine";

export function contentCriterion(geneticEngine: GeneticEngine): boolean {
    let tam: number = geneticEngine.metrics.historicalMaxFitness.length;
    if( tam < geneticEngine.config.stopValue)
        return false;
    let plagioFitnessControl: number[] = geneticEngine.metrics.historicalMaxFitness.slice(tam - geneticEngine.config.stopValue);
    console.log('el largo es: ' + geneticEngine.metrics.historicalMaxFitness);
    for(let i = 1; i < geneticEngine.config.stopValue; i++){
        if(plagioFitnessControl[0] !== plagioFitnessControl[i]){
            return false;
        }
    }
    return true;
}