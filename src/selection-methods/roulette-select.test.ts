import { Character } from "../character";
import { eliteSelect } from "./elite-select";
import { Warrior } from "../character-classes/character-class";
import { getRouletteIndex, rouletteSelect } from "./roulette-select";

var assert = require('assert');
describe('Roulette Selection', function () {
  describe('getRouletteIndex()', function () {
    it('Should return the correct indexes', function () {
      const rouletteBoard = [0.2, 0.3, 0.5]  // |A|A|B|B|B|C|C|C|C|C|
      assert(getRouletteIndex(rouletteBoard, 0.1) === 0);
      assert(getRouletteIndex(rouletteBoard, 0.45) === 1);
      assert(getRouletteIndex(rouletteBoard, 0.7) === 2);
      assert(getRouletteIndex(rouletteBoard, 1.2) === -1);
    });
  });
});