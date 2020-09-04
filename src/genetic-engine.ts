import { Character } from "./character";
import { Configuration } from "./configuration";

export class GeneticEngine {
  cross: (population: Character[]) => Character[];
  mutate: (population: Character[]) => Character[];
  select: (population: Character[]) => Character[];
  stopCriterion: (population: Character[]) => boolean;

  population: Character[];

  constructor(configuration: Configuration) {
    this.cross = configuration.crossMethod;
    this.mutate = configuration.mutationMethod;
    this.select = configuration.selectionMethod;
    this.stopCriterion = configuration.stopCriterion;
    this.population = this.generateRandomPopulation()
  }

  startEvolution(canvas: HTMLCanvasElement){


  }

  generateRandomPopulation(): Character[]{
    return []
  }
  
}