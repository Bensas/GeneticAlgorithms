import { GeneticEngine } from "./genetic-engine";
import { Configuration } from "./configuration";
import { rouletteSelect } from "./selection-methods/roulette-select";
import { AllItems } from "./items/all-items";
import { eliteSelect } from "./selection-methods/elite-select";
import { Character } from "./character";
import { Warrior } from "./character-classes/character-class";

var assert = require('assert');
describe('Configuration', function () {
  describe('configuration()', function () {
    it('Should return the correct number of elements', function () {
      let population: Character[] = [];
      for (let i = 1; i <= 10; i++){
        let newChar = new Character(new Warrior());
        newChar.getAptitude = () => i;
        population.push(newChar);
      }

      let configuration: Configuration = new Configuration();
      configuration.selectionMethods.push(eliteSelect);
      configuration.selectionQuantities.push(0.8);
      configuration.selectionMethods.push(rouletteSelect);
      configuration.selectionQuantities.push(0.2);
      const mockGeneticEngine = new GeneticEngine(new Configuration(), <AllItems>{});

      assert(configuration.select(population, 8, mockGeneticEngine).length === 8);
      assert(configuration.select(population, 12, mockGeneticEngine).length === 12);
    });
  });
});