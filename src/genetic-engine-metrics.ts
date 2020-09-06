import { modeItem } from "./mode-item";

export interface GeneticEngineMetrics {
  historicalAverageFitness: number[],
  historicalMinFitness: number[],
  startTime: number,
  historicalMaxFitness: number[],
  generationNumber: number,
  modeFitness: modeItem[]
}