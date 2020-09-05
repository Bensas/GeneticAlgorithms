import { Character } from "./character";
import { Configuration } from "./configuration";
import { Item } from "./items/item";
import { AllItems } from "./items/all-items";
import { GeneticEngineMetrics } from "./genetic-engine-metrics";

export class GeneticEngine {

  metrics: GeneticEngineMetrics;

  constructor(public config: Configuration, private allItems: AllItems) { }

  startEvolution(canvas: HTMLElement | null){
    let population = this.generateRandomPopulation(this.config.startingPopulation);
    this.initMetrics(population);
    console.log('Random Population:')
    console.log(population);
    while(this.config.stopCriterion(this)){
      let parents = this.config.select(population, this.config.selectQuantity);
      let children = this.cross(parents);
      children = this.mutate(children);
      population = this.config.replace(population.concat(children), this.config.selectQuantity);
      this.calculateMetrics(population);
    }
  }

  initMetrics(population: Character[]): void {
    this.metrics = {
      averageFitness: this.averageFitness(population),
      minFitness: this.minFitness(population),
      startTime: new Date().getTime(),
      historicalMaxFitness: [this.maxFitness(population)]
    };
  }

  calculateMetrics(population: Character[]): void {
    this.metrics.averageFitness = this.averageFitness(population);
    this.metrics.minFitness = this.minFitness(population);
    this.metrics.historicalMaxFitness.push(this.maxFitness(population));
    //console.log(this.metrics);
  }

  generateRandomPopulation(startingPopulation: number): Character[]{
    var tamPoblacionInicial: number = startingPopulation;
    let poblacion: Character[] = [];
    for(let i = 0; i < tamPoblacionInicial; i++){
      let newChar = new Character();
      newChar.genes.forEach((value, key) => {
        if (typeof value !== 'number'){
          if(key === 'helmet')
            (<Item>value) = this.randomItem(this.allItems.helmets);
          else if(key === 'boots')
            (<Item>value) = this.randomItem(this.allItems.boots);
          else if(key === 'gloves')
            (<Item>value) = this.randomItem(this.allItems.gloves);
          else if(key === 'breastplate')
            (<Item>value) = this.randomItem(this.allItems.breastplates);
          else if(key === 'weapon')
            (<Item>value) = this.randomItem(this.allItems.weapons);
        }
        else{
          (<Number>value) = Math.floor(Math.random()*(20 - 13) + 13) / 10;
        }
        poblacion.push(newChar);
      });
    }
    return poblacion;
  }

  randomItem(lista: Item[]): Item{
    var item: Item = lista[Math.floor(Math.random()*lista.length)];
    return item;
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