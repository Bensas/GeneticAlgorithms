import { ItemLoader } from './items/item-loader';
import { AllItems } from './items/all-items';
import { Configuration } from './configuration';
import { GeneticEngine } from './genetic-engine';

window.onload = () => {
  let configUploadertext = document.getElementById('config-uploader-text');
  let configUploader = document.getElementById('config-uploader');
  let selectClassSelect = document.getElementById('select-class-select');
  let selectClassText = document.getElementById('select-class-text');
  let startButton = document.getElementById('start-button');
  let loadingMessage = document.getElementById('loading-message');
  let metricsCanvas = document.getElementById('metrics-cavas');
  
  if (configUploader) {
    configUploader.onchange = async (event: any) => {
      const config: Configuration = await Configuration.fromFile(event.target.files[0]); 
      if (configUploader) configUploader.style.display = 'none';
      if (selectClassText) selectClassText.style.display = 'block';
      if (selectClassSelect) selectClassSelect.onchange = async (event: any) => {
        config.selectClass(event.target.value);
      }
      if (startButton) startButton.onclick = async (event: any) => {
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
        
      }
    };
  }
}

// sleep time expects milliseconds
function sleep (time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Usage!
sleep(500).then(() => {
    // Do something after the sleep!
});