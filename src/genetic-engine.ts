import { Character } from "./character";
import { Configuration } from "./configuration";
import { Item } from "./items/item";
import { AllItems } from "./items/all-items";
import { GeneticEngineMetrics } from "./genetic-engine-metrics";

export class GeneticEngine {

  metrics: GeneticEngineMetrics;

  constructor(public config: Configuration, private allItems: AllItems) { }

  startEvolution(canvas: HTMLCanvasElement){
    let population = this.generateRandomPopulation();

    while(this.config.stopCriterion(this)){
      let parents = this.config.select(population, this.config.selectQuantity);
      let children = this.cross(parents);
      children = this.mutate(children);
      population = this.config.replace(population.concat(children), this.config.selectQuantity);
      this.calculateMetrics(population);
    }
  }

  calculateMetrics(population: Character[]): void {
    if (!this.metrics) {
      this.metrics = {
        averageFitness: this.averageFitness(population),
        minFitness: this.minFitness(population),
        startTime: new Date().getTime(),
        historicalMaxFitness: [this.maxFitness(population)]
      }
    } else {
      this.metrics.averageFitness = this.averageFitness(population);
      this.metrics.minFitness = this.minFitness(population);
      this.metrics.historicalMaxFitness.push(this.maxFitness(population));
    }
    //console.log(this.metrics);
  }

  generateRandomPopulation(): Character[]{
    return []
  }

  grabRandomItems() {

  }

  randomValue(lista: Item[]){
    
  }

  cross(population: Character[]): Character[] {
    let result: Character[] = [];
    for (let i = 0; i < population.length; i += 2) {
      result = result.concat(this.config.cross(population[i], population[i+1]));
    }
    return result;
  }

  mutate(population: Character[]): Character[] {
    return population.map((character: Character) => this.config.mutate(character, this.config.mutationChance));
  }

  averageFitness(population: Character[]): number {
    return population.reduce((accum, current) => accum + current.getAptitude(), 0) / population.length;
  }

  minFitness(population: Character[]): number {
    return population.reduce((prev, current) => current.getAptitude() < prev ? current.getAptitude() : prev, population[0].getAptitude());
  }

  maxFitness(population: Character[]): number {
    return population.reduce((prev, current) => current.getAptitude() > prev ? current.getAptitude() : prev, population[0].getAptitude());
  }
  
}