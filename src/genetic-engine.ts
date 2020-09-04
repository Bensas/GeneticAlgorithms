import { Character } from "./character";
import { Configuration } from "./configuration";
import { Item } from "./items/item";

export class GeneticEngine {
  cross: (population: Character[]) => Character[];
  mutate: (population: Character[]) => Character[];
  select: (population: Character[]) => Character[];
  stopCriterion: (population: Character[]) => boolean;

  constructor(configuration: Configuration) {
    this.cross = configuration.crossMethod;
    this.mutate = configuration.mutationMethod;
    this.select = configuration.selectionMethod;
    this.stopCriterion = configuration.stopCriterion;
  }

  startEvolution(canvas: HTMLCanvasElement){
    let population = this.generateRandomPopulation();

    while(this.stopCriterion(population)){
      let newPopulation = this.cross(population);
      newPopulation = this.mutate(newPopulation);
      population = newPopulation.concat(population);
      population = this.select(population);
    }
  }

  generateRandomPopulation(): Character[]{
    return []
  }

  grabRandomItems() {

  }

  randomValue(lista: Item[]){
    
  }

  // crossCharacters(population: Character[]){
  //   for (let i = 0; i < population.length - 1; i++){
  //     this.cross(population[i], )
  //   }
  // }
  
}