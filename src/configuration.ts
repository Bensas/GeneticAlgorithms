import { Character } from "./character"
import { AllItems } from "./items/all-items";
import { uniformCross } from "./cross-methods/uniform-cross";
import { uniformMultiGeneMutate } from "./mutation-methods/uniform-multi-gene";
import { eliteSelect } from "./selection-methods/elite-select";
import { timeCriterion } from "./stop-criteria/time-criterion";
import { DEFAULT_STARTING_POPULATION, DEFAULT_SELECT_QUANTITY, DEFAULT_MUTATION_CHANCE } from "./defaults";
import { GeneticEngine } from "./genetic-engine";
import { CharacterClass, Warrior, Archer, Tank, Spy } from "./character-classes/character-class";
import { completeGenMutate } from "./mutation-methods/complete-gene";
import { oneGenMutate } from "./mutation-methods/one-gen";
import { limitedMultiGenMutate } from "./mutation-methods/limited-multi-gene";
import { structureCriterion } from "./stop-criteria/structure-criterion";
import { boltzmannSelect } from "./selection-methods/boltzmann-select";
import { rankingSelect } from "./selection-methods/ranking-select";
import { rouletteSelect } from "./selection-methods/roulette-select";
import { universalSelect } from "./selection-methods/universal-select";
const d3 = require('d3');

export const WARRIOR = 'warrior';
export const ARCHER = 'archer';
export const TANK = 'tank';
export const SPY = 'spy';

export class Configuration {

  selectedCharacterClass: CharacterClass;

  startingPopulation: number;

  select: (population: Character[], quantity: number, geneticEngine: GeneticEngine) => Character[];
  selectQuantity: number;
  cross: (c1: Character, c2: Character) => Character[];
  mutate: (c: Character, mutationChance: number, geneticEngine: GeneticEngine) => Character;
  mutationChance: number;
  replace: (population: Character[], quantity: number) => Character[];

  stopCriterion: (geneticEngine: GeneticEngine) => boolean;
  stopValue: number;//Might represent elapsed time, average fitness, etc. depending on the stop critetion
  numberOfGenerations: number;

  equipment: AllItems;

  constructor(){ 
    this.selectedCharacterClass = new Warrior();
  }

  selectClass(className: string){
    switch (className){
      case WARRIOR:
        this.selectedCharacterClass = new Warrior();
        break;
      case ARCHER:
        this.selectedCharacterClass = new Archer();
        break;
      case TANK:
        this.selectedCharacterClass = new Tank();
        break;
      case SPY:
        this.selectedCharacterClass = new Spy();
        break;
    }
  }

  static async fromFile(file: any): Promise<Configuration> {
    return new Promise<Configuration>((resolve, reject)=> {
      const reader = new FileReader();
      reader.onload = function(event) {
        const fileContents = event.target?.result;
        const configObj = JSON.parse(<string>fileContents);
        console.log(configObj);
        resolve(Configuration.fromConfigObject(configObj));
      }
      reader.readAsText(file);
    })
  }

  static fromConfigObject(configObj: any): Configuration {
    let result: Configuration = new Configuration()
    result.startingPopulation = configObj.startingPopulation ?? DEFAULT_STARTING_POPULATION;
    result.selectQuantity = configObj.selectQuantity ?? DEFAULT_SELECT_QUANTITY;
    result.mutationChance = configObj.mutationChance ?? DEFAULT_MUTATION_CHANCE;
    result.replace = eliteSelect;

    switch (configObj.crossMethod) {
      case 'uniform':
        result.cross = uniformCross;
        break;
      default:
        console.log('No cross method provided, deaulting to uniform.');
        result.cross = uniformCross;
    }

    switch (configObj.mutationMethod) {
      case 'uniformMultiGene':
        result.mutate = uniformMultiGeneMutate;
        break;
      case 'complete':
        result.mutate = completeGenMutate;
        break;
      case 'oneGene':
        result.mutate = oneGenMutate;
        break;
      case 'limitedMultiGene':
        result.mutate = limitedMultiGenMutate;
        break;

      default:
        console.log('No mutation method provided, defaulting to uniformMultiGene.');
        result.mutate = uniformMultiGeneMutate;
        
    }
    
    if (configObj.selectionMethod)
      switch (configObj.selectionMethod.method) {
        case 'elite':
          result.select = eliteSelect;
          break;
        case 'ranking':
          result.select = rankingSelect;
          break;
        case 'roulette':
          result.select = rouletteSelect;
          break;
        case 'universal':
          result.select = universalSelect;
          break;
        case 'boltzmann':
          result.select = boltzmannSelect;
        default:
          console.log('No selection method provided, defaulting to elite.');
          result.select = eliteSelect;
      }
    if (configObj.stopCriterion)
      switch (configObj.stopCriterion.criterion) {
        case 'time':
          result.stopCriterion = timeCriterion;
          result.stopValue = configObj.stopCriterion.value;
          break;
        case 'structure':
          result.stopCriterion = structureCriterion;
          result.stopValue = configObj.stopCriterion.value;
          result.numberOfGenerations = configObj.stopCriterion.numberOfGenerations;
          break;
        default:
          console.log('No stop criterion provided, defaulting to time.');
          result.stopCriterion = timeCriterion;
          result.stopValue = 60;
      }
    return result;
  }
}