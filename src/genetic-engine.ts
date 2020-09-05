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
      // let children = this.cross(parents);
      // children = this.mutate(children);
      // population = this.replace(newPopulation.concat(population);
    }
  }

  generateRandomPopulation(): Character[]{
    return []
  }

  grabRandomItems() {

  }

  randomValue(lista: Item[]){
    
  }

  // cross (population: Character[]){
  //   population.
  // }

  // crossCharacters(population: Character[]){
  //   for (let i = 0; i < population.length - 1; i++){
  //     this.cross(population[i], )
  //   }
  // }
  
}