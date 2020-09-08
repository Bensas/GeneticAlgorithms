import { Configuration } from "../configuration";
import { anularCross } from "../cross-methods/anular-cross";
import { onePointCross } from "../cross-methods/one-point-cross";
import { twoPointCross } from "../cross-methods/two-point-cross";
import { uniformCross } from "../cross-methods/uniform-cross";
import { fillAll } from "../implementation-methods/fill-all";
import { fillParent } from "../implementation-methods/fill-parent";
import { completeGenMutate } from "../mutation-methods/complete-gene";
import { limitedMultiGenMutate } from "../mutation-methods/limited-multi-gene";
import { oneGenMutate } from "../mutation-methods/one-gen";
import { uniformMultiGeneMutate } from "../mutation-methods/uniform-multi-gene";
import { boltzmannSelect } from "../selection-methods/boltzmann-select";
import { eliteSelect } from "../selection-methods/elite-select";
import { probabilisticTournamentSelect } from "../selection-methods/probabilistic-tournament-selection";
import { rankingSelect } from "../selection-methods/ranking-select";
import { rouletteSelect } from "../selection-methods/roulette-select";
import { tournamentSelect } from "../selection-methods/tournament-selection";
import { universalSelect } from "../selection-methods/universal-select";
import { enoughGenCriterion } from "../stop-criteria/enough-gen-criterion";
import { GeneticEngine } from "../genetic-engine";
import { AllItems } from "../items/all-items";
import { Archer } from "../character-classes/character-class";

const CROSS_METHODS = [
  anularCross,
  onePointCross,
  twoPointCross,
  uniformCross
];

const IMPLEMENTATION_METHODS = [
  fillAll,
  fillParent
];

const MUTATION_METHODS = [
  completeGenMutate,
  limitedMultiGenMutate,
  oneGenMutate,
  uniformMultiGeneMutate
];

const SELECTION_METHODS = [
  boltzmannSelect,
  eliteSelect,
  probabilisticTournamentSelect,
  rankingSelect,
  rouletteSelect,
  tournamentSelect,
  universalSelect
];

const POPULATION_SIZE = 300;
const SELECT_QUANTITY = 50;
const STOP_CRITERION = enoughGenCriterion;
const STOP_VALUE = 500;

export class GeneticEngineGeneticEngine {

  findBestConfig(allItems: AllItems): Configuration {
    const allConfigs: Configuration[] = this.generateAllConfigs();
    const geneticEngine: GeneticEngine = new GeneticEngine(allConfigs[0], allItems);
    let currentMaxApt = 0;
    let bestConfig = new Configuration();
    allConfigs.forEach((config) => {
      let maxApt = geneticEngine.quickEvolution(config).reduce((prev, curr) => curr.getAptitude() > prev ?curr.getAptitude() : prev, 0);
      for (let i = 0; i < 5; i++) {
        let newMax = geneticEngine.quickEvolution(config).reduce((prev, curr) => curr.getAptitude() > prev ?curr.getAptitude() : prev, 0);
        if (newMax > maxApt)
          maxApt = newMax;
      }
      if (maxApt > currentMaxApt){
        currentMaxApt = maxApt;
        bestConfig = config;
        console.log('New best: ' + currentMaxApt);
      }
    });
    console.log(bestConfig);
    console.log(currentMaxApt)
    return bestConfig;
  }

  generateAllConfigs(): Configuration[] {
    return [new Configuration()];
    // let result:Configuration[] = [];
    // CROSS_METHODS.forEach((cross) => {
    //   IMPLEMENTATION_METHODS.forEach((implement) => {
    //     MUTATION_METHODS.forEach((mutate) => {
    //       SELECTION_METHODS.forEach((select) => {
    //         let config = new Configuration();
    //         config.cross = cross;
    //         config.replace = implement;
    //         config.mutate = mutate;
    //         config.selectedCharacterClass = new Archer();
    //         config.selectionMethods[0] = select;
    //         config.selectionMethods[1] = select;
    //         config.selectionQuantities[0] = 1;
    //         config.selectionQuantities[1] = 0;
    //         config.populationSize = POPULATION_SIZE;
    //         config.selectQuantity = SELECT_QUANTITY;
    //         config.mutationChance = 0.6;
    //         config.stopCriterion = STOP_CRITERION;
    //         config.stopValue = STOP_VALUE;
    //         result.push(config);
    //       });
    //     });
    //   });
    // });
    // return result;
  }
}