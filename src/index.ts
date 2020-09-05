import { ItemLoader } from './items/item-loader';
import { AllItems } from './items/all-items';
import { Configuration } from './configuration';
import { GeneticEngine } from './genetic-engine';

window.onload = () => {
  let configUploader = document.getElementById('config-uploader');
  let loadingMessage = document.getElementById('loading-message');
  let metricsCanvas = document.getElementById('metrics-cavas');
  let clasSelect = document.getElementById('class-select');

  if (configUploader) {
    configUploader.onchange = async (event: any) => {
      const config: Configuration = await Configuration.fromFile(event.target.files[0]); 

      const allItems: AllItems = { helmets: [], weapons: [], boots: [], gloves: [], breastplates: []};
      if (loadingMessage) loadingMessage.innerHTML = 'Loading weapons...';
      await ItemLoader.loadItemsFromTsv('armasReduced.tsv', allItems.weapons);
      if (loadingMessage) loadingMessage.innerHTML = 'Loading boots...';
      await ItemLoader.loadItemsFromTsv('botasReduced.tsv', allItems.boots);
      if (loadingMessage) loadingMessage.innerHTML = 'Loading helmets...';
      await ItemLoader.loadItemsFromTsv('cascosReduced.tsv', allItems.helmets);
      if (loadingMessage) loadingMessage.innerHTML = 'Loading gloves...';
      await ItemLoader.loadItemsFromTsv('guantesReduced.tsv', allItems.gloves);
      if (loadingMessage) loadingMessage.innerHTML = 'Loading breastplates...';
      await ItemLoader.loadItemsFromTsv('pecherasReduced.tsv', allItems.breastplates);
      if (loadingMessage) loadingMessage.innerHTML = 'All Items loaded :)';

      const geneticEngine = new GeneticEngine(config, allItems);
      geneticEngine.startEvolution(metricsCanvas);
    };
  }
}