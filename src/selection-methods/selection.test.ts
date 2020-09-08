import { Character } from "../character";
import { eliteSelect } from "./elite-select";
import { Warrior } from "../character-classes/character-class";
import { getRouletteIndex, rouletteSelect } from "./roulette-select";
import { boltzmannSelect } from "./boltzmann-select";
import { GeneticEngine } from "../genetic-engine";
import { Configuration } from "../configuration";
import { AllItems } from "../items/all-items";
import { GeneticEngineMetrics } from "../genetic-engine-metrics";
import { rankingSelect } from "./ranking-select";
import { tournamentSelect } from "./tournament-selection";
import { universalSelect } from "./universal-select";
import { probabilisticTournamentSelect } from "./probabilistic-tournament-selection";

var assert = require('assert');
describe('All Selection Methods', function () {
  describe('select()', function () {
    it('Should return the correct number of elements', function () {

      let population: Character[] = [];
      for (let i = 1; i <= 10; i++){
        let newChar = new Character(new Warrior());
        newChar.getAptitude = () => i;
        population.push(newChar);
      }

      let mockGeneticEngine = new GeneticEngine(new Configuration(), <AllItems>{});
      mockGeneticEngine.metrics = <GeneticEngineMetrics>{generationNumber: 10};

      assert(rouletteSelect(population, 8).length === 8);
      assert(rouletteSelect(population, 12).length === 12);
      assert(universalSelect(population, 8).length === 8);
      assert(universalSelect(population, 12).length === 12);
      assert(boltzmannSelect(population, 8, mockGeneticEngine).length === 8);
      assert(boltzmannSelect(population, 12, mockGeneticEngine).length === 12);
      assert(eliteSelect(population, 8).length === 8);
      assert(eliteSelect(population, 12).length === 12);
      assert(rankingSelect(population, 8).length === 8);
      assert(rankingSelect(population, 12).length === 12);
      assert(tournamentSelect(population, 8).length === 8);
      assert(tournamentSelect(population, 12).length === 12);
      assert(probabilisticTournamentSelect(population, 8).length === 8);
      assert(probabilisticTournamentSelect(population, 12).length === 12);

    });
  });
});