import { GeneticEngine } from "./genetic-engine";
import { Configuration } from "./configuration";
import { rouletteSelect } from "./selection-methods/roulette-select";
import { AllItems } from "./items/all-items";
import { eliteSelect } from "./selection-methods/elite-select";
import { Character, HEIGHT, HELMET, WEAPON, BOOTS, GLOVES, BREASTPLATE } from "./character";
import { Warrior } from "./character-classes/character-class";
import { Item } from "./items/item";

const item1 = {
  id: 0,
  strength: 0,
  agility: 0,
  exp: 0,
  resistance: 0,
  health: 0
}

const item2 = {
  id: 1,
  strength: 0,
  agility: 0,
  exp: 0,
  resistance: 0,
  health: 0
}

var assert = require('assert');
describe('Configuration', function () {
  describe('geneticDiversity()', function () {
    it('Should return the correct number of different genes', function () {
      let population: Character[] = [];
      population.push(getItem1Char());
      population.push(getItem1Char());
      
      const mockGeneticEngine = new GeneticEngine(new Configuration(), <AllItems>{});
      
      assert(mockGeneticEngine.geneticDiversity(population) === 6);
      population[0].genes.set(HEIGHT, 1);
      assert(mockGeneticEngine.geneticDiversity(population) === 7);
    });
  });
});

function getItem1Char(): Character {
  let char: Character = new Character(new Warrior);
  char.genes = new Map();
  char.genes.set(HEIGHT, 0);
  char.genes.set(HELMET, item1);
  char.genes.set(WEAPON, item1);
  char.genes.set(BOOTS, item1);
  char.genes.set(GLOVES, item1);
  char.genes.set(BREASTPLATE, item1);
  return char;
}