import { Character } from "./character"
import { AllItems } from "./items/all-items";
import { uniformCross } from "./cross-methods/uniform-cross";
import { uniformMultiGeneMutate } from "./mutation-methods/uniform-multi-gene";
import { eliteSelect } from "./selection-methods/elite-select";
import { timeCriterion } from "./stop-criteria/time-criterion";
const d3 = require('d3');

export class Configuration {
  crossMethod: (c1: Character, c2: Character) => Character[];
  mutationMethod: (c: Character) => Character;
  selectionMethod: (population: Character[], quantity: number) => Character[];
  implementationStrategy: (population: Character[]) => Character[];
  stopCriterion: (population: Character[], value: number) => boolean;
  equipment: AllItems;

  constructor(){ }

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
    switch (configObj.crossMethod) {
      case 'uniform':
        result.crossMethod = uniformCross;
        break;
      default:
        console.log('No cross method provided, deaulting to uniform.');
        result.crossMethod = uniformCross;
    }

    switch (configObj.mutationMethod) {
      case 'uniformMultiGene':
        result.mutationMethod = uniformMultiGeneMutate;
        break;
      default:
        console.log('No mutation method provided, deaulting to uniformMultiGene.');
        result.mutationMethod = uniformMultiGeneMutate;
    }
    
    if (configObj.selectionMethod)
      switch (configObj.selectionMethod.method) {
        case 'elite':
          result.selectionMethod = eliteSelect;
          break;
        default:
          console.log('No selection method provided, deaulting to elite.');
          result.selectionMethod = eliteSelect;
      }
    if (configObj.stopCriterion)
      switch (configObj.stopCriterion.criterion) {
        case 'time':
          result.stopCriterion = timeCriterion;
          break;
        default:
          console.log('No stop criterion provided, deaulting to time.');
          result.stopCriterion = timeCriterion;
      }
    return result;
  }
}

// "stopCriterion": {
//   "criterion": "time",
//   "value": 60
// }