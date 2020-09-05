import { GeneticEngine } from "../genetic-engine";

export function timeCriterion(geneticEngine: GeneticEngine): boolean {
  return geneticEngine.metrics.elapsedTime > geneticEngine.config.stopValue;
}