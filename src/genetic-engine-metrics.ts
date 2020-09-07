import { modeItem } from "./mode-item";

export interface GeneticEngineMetrics {
  averageFitness: number,
  minFitness: number,
  startTime: number,
  historicalMaxFitness: number[],
  generationNumber: number,
  modeFitness: modeItem[],
  geneticDiversity: number
}