import { Character } from "../character";
import { eliteSelect } from "./elite-select";
import { Warrior } from "../character-classes/character-class";
import { getRouletteIndex, rouletteSelect } from "./roulette-select";
import { getPseudoAptitudePopulation } from "./ranking-select";

var assert = require('assert');
describe('Ranking Selection', function () {
  describe('getPseudoAptitudePopulation()', function () {
    it('Should return a population with getAptitude() methods that return their ranking', function () {
      let population: Character[] = [];
      for (let i = 1; i <= 10; i++){
        let newChar = new Character(new Warrior());
        newChar.getAptitude = () => Math.random();
        population.push(newChar);
      }
      const pseudoAptPop = getPseudoAptitudePopulation(population);
      assert(pseudoAptPop[0].getAptitude() === 1);
      assert(pseudoAptPop[9].getAptitude() === 10);
    });
  });
});