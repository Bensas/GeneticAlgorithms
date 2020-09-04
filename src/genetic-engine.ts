import { Character } from "./character";
import { Configuration } from "./configuration";
import { Item } from "./items/item";
import { AllItems } from "./items/all-items";

export class GeneticEngine {

  constructor(private config: Configuration, private allItems: AllItems) {
  }

  startEvolution(canvas: HTMLCanvasElement){
    let population = this.generateRandomPopulation();

    while(this.stopCriterion(population, )){
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

  select(population: Character[]): Character[] {
    return this.select(population);
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