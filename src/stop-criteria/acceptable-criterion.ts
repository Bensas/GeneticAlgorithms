import { GeneticEngine } from "../genetic-engine";
import { Configuration } from "../configuration";

export function acceptableCriterion(geneticEngine: GeneticEngine): boolean {
  return  geneticEngine.metrics.historicalAverageFitness[geneticEngine.metrics.historicalMaxFitness.length -1] > geneticEngine.config.stopValue;
}