import { GeneticEngine } from "../genetic-engine";

export function enoughGenCriterion(geneticEngine: GeneticEngine): boolean {
  return  geneticEngine.metrics.generationNumber >= geneticEngine.config.stopValue;
}