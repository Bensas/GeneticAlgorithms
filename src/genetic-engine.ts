import { Character, HELMET, BOOTS, GLOVES, BREASTPLATE, WEAPON, HEIGHT } from "./character";
import { Configuration } from "./configuration";
import { Item } from "./items/item";
import { AllItems } from "./items/all-items";
import { GeneticEngineMetrics } from "./genetic-engine-metrics";
import { MetricsChart } from "./metrics-chart";
import { modeItem } from "./mode-item";
import { eliteSelect } from "./selection-methods/elite-select";
import { rouletteSelect } from "./selection-methods/roulette-select";

export class GeneticEngine {

  metrics: GeneticEngineMetrics;

  chart: MetricsChart;

  constructor(public config: Configuration, private allItems: AllItems) { }

  startEvolution(canvas: HTMLCanvasElement, resultElem: HTMLElement, speedSLider: any){
    let population = this.generateRandomPopulation(this.config.populationSize);
    this.initMetrics(population);
    this.chart = new MetricsChart(canvas);

    const loop = setInterval(() => {
      let parents = this.config.select(population, this.config.populationSize, this);
      let children = this.cross(parents);
      children = this.mutate(children);
      population = this.config.replace(population, children, this.config.selectQuantity);
      this.calculateMetrics(population);
      this.chart.updateChart(this.metrics);
      console.log('Average fitness: ' + this.metrics.averageFitness);
      // console.log('Min fitness: ' + this.metrics.minFitness);
      console.log('Num of Gen: ' + this.metrics.generationNumber + ' / ' + this.config.stopValue)
      if (this.config.stopCriterion(this)){
        clearInterval(loop);
        resultElem.innerHTML = this.generateCharCardHtml(population[0]);
        resultElem.style.display = 'block';
      }
    }, this.getFrequency(speedSLider.value));
  }

  quickEvolution(config: Configuration): Character[]{
    this.config = config;
    let population = this.generateRandomPopulation(this.config.populationSize);
    this.initMetrics(population);
    while (this.config.stopCriterion(this)){
      let parents = this.config.select(population, this.config.populationSize, this);
      let children = this.cross(parents);
      children = this.mutate(children);
      population = this.config.replace(population, children, this.config.selectQuantity);
      this.calculateMetrics(population);
    }
    console.log(this.metrics.historicalMaxFitness[this.metrics.historicalMaxFitness.length-1]);
    return population;
  }

  getFrequency(value: number): number{
    return 1000 - value*10;
  }

  initMetrics(population: Character[]): void {
    this.metrics = {
      averageFitness: this.averageFitness(population),
      minFitness: this.minFitness(population),
      startTime: new Date().getTime(),
      historicalMaxFitness: [this.maxFitness(population)],
      generationNumber: 1,
      modeFitness: [this.modeFitness(population)],
      geneticDiversity: this.geneticDiversity(population)
    };
  }

  calculateMetrics(population: Character[]): void {
    this.metrics.averageFitness = this.averageFitness(population);
    this.metrics.minFitness = this.minFitness(population);
    this.metrics.historicalMaxFitness.push(this.maxFitness(population));
    this.metrics.generationNumber++;
    this.metrics.modeFitness.push(this.modeFitness(population));
    this.metrics.geneticDiversity = this.geneticDiversity(population)

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
  
  modeFitness(population: Character[]): modeItem {
    let modeValue: modeItem = {mode: 0, percentage: 0};
    let map: Map<number, number> = new Map();
    let highestKey: number = 0;
    let highestValue: number = 0;
    population.forEach((element) => {
      let current: number = element.getAptitude();
      map.set(current, (map.get(current) ?? 0) + 1);
      let temp: number = map.get(current) ?? 0;
      if(highestValue < temp){
        highestValue = temp;
        highestKey = current;
      }
    });
    modeValue.mode = highestKey;
    modeValue.percentage = highestValue / population.length;
    return modeValue;
  }

  geneticDiversity(population: Character[]): number {
    let result: number = 0;
    let map: Map<string, Set<Item|number>> = new Map<string, Set<Item|number>>();
    population[0].genes.forEach((value, key) => {
      map.set(key, new Set<Item | number>());
    });
    population.forEach((character)=> {
      character.genes.forEach((value, geneName) => map.get(geneName)?.add(value));
    })

    map.forEach((value) => result += value.size);
    return result;
  }

  generateCharCardHtml(character: Character): string {
    let baseHtml = '<p> <b>Optimal Character</b></p>\
                      <p> <b>Height:</b> {{height}}</p>\
                      <p> <b>Helmet:</b> {{helmet}}</p>\
                      <p> <b>Weapon:</b> {{weapon}}</p>\
                      <p> <b>Boots:</b> {{boots}}</p>\
                      <p> <b>Gloves:</b> {{gloves}}</p>\
                      <p> <b>Breastplate:</b> {{breastplate}}</p>\
                      <p> <b>APTITUDE: {{aptitude}}</b></p>'
    return this.replaceValuesInStringFromMap(baseHtml, character.genes).replace('{{aptitude}}', character.getAptitude().toString());
  }

  replaceValuesInStringFromMap(string: string, map: Map<any, any>){
    map.forEach((value, key) => {
      string = string.replace('{{' + key + '}}', key===HEIGHT? value : value.id);
    });
    return string;
  }
}