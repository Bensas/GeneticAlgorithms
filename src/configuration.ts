import { Character } from "./character"
import { AllItems } from "./items/all-items";
const d3 = require('d3');

export class Configuration {
  crossMethod: (population: Character[]) => Character[];
  mutationMethod: (population: Character[]) => Character[];
  selectionMethod: (population: Character[]) => Character[];
  implementationStrategy: (population: Character[]) => Character[];
  stopCriterion: (population: Character[]) => boolean;
  equipment: AllItems;

  constructor(){ }

  // static async fromFile(file: any) {
  //   const reader = new FileReader();
  //   reader.onload = function(event) {
  //     const fileContents = event.target?.result;
  //     const configObj = JSON.parse(<string>file);
  //     return this.fromConfigObject(configObj);
  //   }
  //   reader.readAsText(file);
  //   return result;
  // }

  // static fromConfigObject(configObj: any): {
  //   let result: Configuration = new Configuration()
  //   switch (configObj.crossMethod){
  //     case 'uniform':
  //       result.crossMethod = uniformCross


  //   }
  // }
}