import { GeneticEngine } from "../genetic-engine";

export function timeCriterion(geneticEngine: GeneticEngine): boolean {
  let elapsedTimeInSeconds = (new Date().getTime() - geneticEngine.metrics.startTime) / 1000;
  return  elapsedTimeInSeconds > geneticEngine.config.stopValue;
}