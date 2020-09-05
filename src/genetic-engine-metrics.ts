export interface GeneticEngineMetrics {
  averageFitness: number,
  minFitness: number,
  startTime: number,
  historicalMaxFitness: number[],
  generationNumber: number
}