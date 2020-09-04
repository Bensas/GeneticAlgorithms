import { AllItems } from './all-items';
import { Item } from './item';
const d3 = require('d3');

export class ItemLoader {
  loadItemsFromTsv(filename: string): AllItems {
    let result: AllItems = {
      helmets: [],
      weapons: [],
      boots: [],
      gloves: [],
      chestPlates: []
    };
    d3.tsv('./datasets/armasReduced.tsv', function(data: any) {
      console.log(result.weapons);
      result.weapons.push(<Item>{
        id: data['id'],
        strength: data['Fu'],
        agility: data['Ag'],
        exp: data['Ex'],
        resistance: data['Re'],
        health: data['Vi']
      })
    });
    return result;
  }
}