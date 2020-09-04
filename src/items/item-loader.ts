import { AllItems } from './all-items';
import { Item } from './item';
const d3 = require('d3');

export class ItemLoader {
  static async loadItemsFromTsv(filename: string, items: Item[]) {
    await d3.tsv('./datasets/' + filename, function(data: any) {
      items.push(<Item>{
        id: data['id'],
        strength: data['Fu'],
        agility: data['Ag'],
        exp: data['Ex'],
        resistance: data['Re'],
        health: data['Vi']
      })
    });
  }
}