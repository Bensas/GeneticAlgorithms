import { GeneticEngine } from "../genetic-engine";
import { Configuration } from "../configuration";

export function acceptableCriterion(geneticEngine: GeneticEngine): boolean {
  return  geneticEngine.metrics.averageFitness > geneticEngine.config.stopValue;
}