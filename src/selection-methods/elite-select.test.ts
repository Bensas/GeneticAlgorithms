import { Character } from "../character";
import { eliteSelect } from "./elite-select";
import { Warrior } from "../character-classes/character-class";

var assert = require('assert');
describe('Elite Selection', function () {
  describe('select()', function () {
    it('Should return the top 5 elements', function () {
      let population: Character[] = [];
      for (let i = 1; i <= 10; i++){
        let newChar = new Character(new Warrior());
        newChar.getAptitude = () => i;
        population.push(newChar);
      }
      // Aptitudes will be as follows[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const newPop = eliteSelect(population, 5);
      assert(newPop.length === 5);
      assert(newPop[0].getAptitude() === 10);
      assert(newPop[4].getAptitude() === 6);
    });
  });
  describe('select1elem()', function () {
    it('Should return the top 5 elements', function () {
      let population: Character[] = [];
      for (let i = 1; i <= 10; i++){
        let newChar = new Character(new Warrior());
        newChar.getAptitude = () => i;
        population.push(newChar);
      }
      // Aptitudes will be as follows[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const newPop = eliteSelect(population, 1);
      assert(newPop.length === 1);
      assert(newPop[0].getAptitude() === 10);
    });
  });
});