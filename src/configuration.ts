import { Character } from "./character"
import { AllItems } from "./items/all-items";
import { uniformCross } from "./cross-methods/uniform-cross";
import { uniformMultiGeneMutate } from "./mutation-methods/uniform-multi-gene";
import { eliteSelect } from "./selection-methods/elite-select";
import { timeCriterion } from "./stop-criteria/time-criterion";
import { DEFAULT_MUTATION_CHANCE, DEFAULT_POPULATION_SIZE } from "./defaults";
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
import { anularCross } from "./cross-methods/anular-cross";
import { onePointCross } from "./cross-methods/one-point-cross";
import { twoPointCross } from "./cross-methods/two-point-cross";
import { enoughGenCriterion } from "./stop-criteria/enough-gen-criterion";
import { contentCriterion } from "./stop-criteria/content-criterion";
import { acceptableCriterion } from "./stop-criteria/acceptable-criterion";
import { fillAll } from "./implementation-methods/fill-all";
import { fillParent } from "./implementation-methods/fill-parent";
import { tournamentSelect } from "./selection-methods/tournament-selection";
import { probabilisticTournamentSelect } from "./selection-methods/probabilistic-tournament-selection";
const d3 = require('d3');

export const WARRIOR = 'warrior';
export const ARCHER = 'archer';
export const TANK = 'tank';
export const SPY = 'spy';

export class Configuration {

  selectedCharacterClass: CharacterClass;

  populationSize: number;
  selectQuantity: number;

  selectionMethods: ((population: Character[], quantity: number, geneticEngine: GeneticEngine) => Character[])[];
  selectionQuantities: number[];
  cross: (c1: Character, c2: Character) => Character[];
  mutate: (c: Character, mutationChance: number, geneticEngine: GeneticEngine) => Character;
  mutationChance: number;
  replace: (population: Character[], children: Character[], quantity: number) => Character[];

  stopCriterion: (geneticEngine: GeneticEngine) => boolean;
  stopValue: number;//Might represent elapsed time, average fitness, etc. depending on the stop critetion
  numberOfGenerations: number;

  equipment: AllItems;

  constructor(){ 
    this.selectedCharacterClass = new Warrior();
    this.selectionMethods = [];
    this.selectionQuantities = [];
  }

  select(population: Character[], quantity: number, geneticEngine: GeneticEngine): Character[] {
    let result: Character[] = [];
    this.selectionMethods.forEach((method, index) => {
      result.push(...method(population, Math.round(quantity * this.selectionQuantities[index]), geneticEngine))
    });
    return result;
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
    result.populationSize = configObj.populationSize ?? DEFAULT_POPULATION_SIZE;
    result.selectQuantity = configObj.selectQuantity ?? 40;
    result.mutationChance = configObj.mutationChance ?? DEFAULT_MUTATION_CHANCE;

    switch (configObj.replace) {
      case 'fillAll':
        result.replace = fillAll;
        break;
      case 'fillParent':
        result.replace = fillParent;
        break;
      default:
        console.log('No replace method provided, defaulting to fillAll.');
        result.replace = fillAll;
    }

    switch (configObj.crossMethod) {
      case 'uniform':
        result.cross = uniformCross;
        break;
      case 'anular':
        result.cross = anularCross;
        break;
      case 'onePoint':
        result.cross = onePointCross;
        break;
      case 'twoPoint':
        result.cross = twoPointCross;
        break;
      default:
        console.log('No cross method provided, defaulting to uniform.');
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
    
    if (configObj.selectionMethods)
      configObj.selectionMethods.forEach((element: any) => {
        switch (element.method) {
          case 'elite':
            result.selectionMethods.push(eliteSelect);
            break;
          case 'ranking':
            result.selectionMethods.push(rankingSelect);
            break;
          case 'roulette':
            result.selectionMethods.push(rouletteSelect);
            break;
          case 'universal':
            result.selectionMethods.push(universalSelect);
            break;
          case 'boltzmann':
            result.selectionMethods.push(boltzmannSelect);
            break;
          case 'tournament':
            result.selectionMethods.push(tournamentSelect);
            break;
          case 'probabilisticTournament':
            result.selectionMethods.push(probabilisticTournamentSelect);
            break;
          default:
            console.log('No selection method provided, defaulting to elite.');
            result.selectionMethods.push(eliteSelect);
        }
        result.selectionQuantities.push(element.quantity)
      });
      
    if (configObj.stopCriterion)
      switch (configObj.stopCriterion.criterion) {
        case 'generationCount':
          result.stopCriterion = enoughGenCriterion;
          result.stopValue = configObj.stopCriterion.value;
          break;
        case 'content':
          result.stopCriterion = contentCriterion;
          result.stopValue = configObj.stopCriterion.value;
          break;
        case 'acceptable':
          result.stopCriterion = acceptableCriterion;
          result.stopValue = configObj.stopCriterion.value;
          break;
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