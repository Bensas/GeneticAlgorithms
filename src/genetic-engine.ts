import { Character, HELMET, BOOTS, GLOVES, BREASTPLATE, WEAPON } from "./character";
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
    console.log('Random Population:');
    console.log(population);
    console.log(this.config.stopCriterion(this));
    while(!this.config.stopCriterion(this)){
      let parents = this.config.select(population, this.config.selectQuantity);
      let children = this.cross(parents);
      children = this.mutate(children);
      population = this.config.replace(population.concat(children), this.config.selectQuantity);
      console.log(population);
      this.calculateMetrics(population);
    }
  }

  initMetrics(population: Character[]): void {
    this.metrics = {
      averageFitness: this.averageFitness(population),
      minFitness: this.minFitness(population),
      startTime: new Date().getTime(),
      historicalMaxFitness: [this.maxFitness(population)],
      generationNumber: 0
    };
  }

  calculateMetrics(population: Character[]): void {
    this.metrics.averageFitness = this.averageFitness(population);
    this.metrics.minFitness = this.minFitness(population);
    this.metrics.historicalMaxFitness.push(this.maxFitness(population));
    this.metrics.generationNumber++;
    //console.log(this.metrics);
  }

  generateRandomPopulation(startingPopulation: number): Character[]{
    var tamPoblacionInicial: number = startingPopulation;
    let poblacion: Character[] = [];
    for(let i = 0; i < tamPoblacionInicial; i++){
      poblacion.push(this.freshCharacter());
    }
    return poblacion;
  }

  freshCharacter(): Character {
    let newChar = new Character(this.config.selectedCharacterClass);
    newChar.genes.forEach((value, key) => {
      if (typeof value !== 'number'){
        if(key === 'helmet')
          newChar.genes.set(key, this.randomItem(key));
        else if(key === 'boots')
          newChar.genes.set(key, this.randomItem(key));
        else if(key === 'gloves')
          newChar.genes.set(key, this.randomItem(key));
        else if(key === 'breastplate')
          newChar.genes.set(key, this.randomItem(key));
        else if(key === 'weapon')
          newChar.genes.set(key, this.randomItem(key));
      }
      else{
        newChar.genes.set(key, Math.floor(Math.random()*(20 - 13) + 13) / 10);
      }
    });
    return newChar;
  }

  randomItem(itemType: String): Item {
    let item: Item = <Item>{ };
    switch(itemType){
      case HELMET: {
        item = this.allItems.helmets[Math.floor(Math.random()*this.allItems.helmets.length)];
        break;
      }
      case BOOTS: {
        item = this.allItems.boots[Math.floor(Math.random()*this.allItems.boots.length)];
        break;
      }
      case GLOVES: {
        item = this.allItems.gloves[Math.floor(Math.random()*this.allItems.gloves.length)];
        break;
      }
      case BREASTPLATE: {
        item = this.allItems.breastplates[Math.floor(Math.random()*this.allItems.breastplates.length)];
        break;
      }
      case WEAPON: {
        item = this.allItems.weapons[Math.floor(Math.random()*this.allItems.weapons.length)];
        break;
      }
    }
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
    return population.map((character: Character) => this.config.mutate(character, this.config.mutationChance, this));
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