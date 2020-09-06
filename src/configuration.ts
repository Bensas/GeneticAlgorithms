import { Character } from "./character"
import { AllItems } from "./items/all-items";
import { uniformCross } from "./cross-methods/uniform-cross";
import { uniformMultiGeneMutate } from "./mutation-methods/uniform-multi-gene";
import { eliteSelect } from "./selection-methods/elite-select";
import { timeCriterion } from "./stop-criteria/time-criterion";
import { DEFAULT_STARTING_POPULATION, DEFAULT_SELECT_QUANTITY, DEFAULT_MUTATION_CHANCE } from "./defaults";
import { GeneticEngine } from "./genetic-engine";
import { CharacterClass, Warrior } from "./character-classes/character-class";
const d3 = require('d3');

export class Configuration {

  selectedCharacterClass: CharacterClass;

  startingPopulation: number;

  select: (population: Character[], quantity: number) => Character[];
  selectQuantity: number;
  cross: (c1: Character, c2: Character) => Character[];
  mutate: (c: Character, mutationChance: number, geneticEngine: GeneticEngine) => Character;
  mutationChance: number;
  replace: (population: Character[], quantity: number) => Character[];

  stopCriterion: (geneticEngine: GeneticEngine) => boolean;
  stopValue: number;//Might represent elapsed time, average fitness, etc. depending on the stop critetion

  equipment: AllItems;

  constructor(){ 
    this.selectedCharacterClass = new Warrior();
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
      default:
        console.log('No mutation method provided, defaulting to uniformMultiGene.');
        result.mutate = uniformMultiGeneMutate;
    }
    
    if (configObj.selectionMethod)
      switch (configObj.selectionMethod.method) {
        case 'elite':
          result.select = eliteSelect;
          break;
        default:
          console.log('No selection method provided, defaulting to elite.');
          result.select = eliteSelect;
      }
    if (configObj.stopCriterion)
      switch (configObj.stopCriterion.criterion) {
        case 'time':
          result.stopCriterion = timeCriterion;
          break;
        default:
          console.log('No stop criterion provided, defaulting to time.');
          result.stopCriterion = timeCriterion;
      }
    return result;
  }
}

// "stopCriterion": {
//   "criterion": "time",
//   "value": 60
// }