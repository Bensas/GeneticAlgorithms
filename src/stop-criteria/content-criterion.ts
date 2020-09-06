import { GeneticEngine } from "../genetic-engine";

export function contentCriterion(geneticEngine: GeneticEngine): boolean {
    let tam: number = geneticEngine.metrics.historicalMaxFitness.length;
    if( tam < geneticEngine.config.stopValue)
        return false;
    return geneticEngine.metrics.historicalMaxFitness[tam - 1] === geneticEngine.metrics.historicalMaxFitness[tam - geneticEngine.config.stopValue];
}