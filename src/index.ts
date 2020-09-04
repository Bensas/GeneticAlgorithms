import { ItemLoader } from './items/item-loader';
import { AllItems } from './items/all-items';
import { Configuration } from './configuration';

window.onload = () => {
  let configUploader = document.getElementById('config-uploader');
  let loadingMessage = document.getElementById('loading-message');
  let metricsCanvas = document.getElementById('metrics-cavas');
  let clasSelect = document.getElementById('class-select');

  if (configUploader) {
    configUploader.onchange = async (event: any) => {
      // const config: Configuration = await Configuration.fromFile(event.target.files[0]);
 
      let allItems: AllItems = { helmets: [], weapons: [], boots: [], gloves: [], breastplates: []};
      if (loadingMessage) loadingMessage.innerHTML = 'Loading weapons...';
      await ItemLoader.loadItemsFromTsv('armas.tsv', allItems.weapons);
      if (loadingMessage) loadingMessage.innerHTML = 'Loading boots...';
      await ItemLoader.loadItemsFromTsv('botas.tsv', allItems.boots);
      if (loadingMessage) loadingMessage.innerHTML = 'Loading helmets...';
      await ItemLoader.loadItemsFromTsv('cascos.tsv', allItems.helmets);
      if (loadingMessage) loadingMessage.innerHTML = 'Loading gloves...';
      await ItemLoader.loadItemsFromTsv('guantes.tsv', allItems.gloves);
      if (loadingMessage) loadingMessage.innerHTML = 'Loading breastplates...';
      await ItemLoader.loadItemsFromTsv('pecheras.tsv', allItems.breastplates);
      if (loadingMessage) loadingMessage.innerHTML = 'All Items loaded :)';
      console.log(allItems);

      allItems.helmets.filter((item) => item.id === 2);

    };
  }
    
  
}
