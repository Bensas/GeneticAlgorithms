import { ItemLoader } from './items/item-loader';
import { AllItems } from './items/all-items';
import { Configuration } from './configuration';
import { GeneticEngine } from './genetic-engine';
import { Character } from './character';
import { GeneticEngineGeneticEngine } from './genetic-genetic-engine/genetic-engine-genetic-engine';

window.onload = () => {
  let configUploadertext = document.getElementById('config-uploader-text');
  let configUploader = document.getElementById('config-uploader');
  let selectClassSelect = document.getElementById('select-class-select');
  let selectClassText = document.getElementById('select-class-text');
  let startButton = document.getElementById('start-button');
  let loadingMessage = document.getElementById('loading-message');
  let loader = document.getElementById('loader');
  let speedSlider = document.getElementById('speed-slider');
  let metricsCanvas = document.getElementById('metrics-canvas');
  let characterCard = document.getElementById('character-card');
  
  if (configUploader) {
    configUploader.onchange = async (event: any) => {
      const config: Configuration = await Configuration.fromFile(event.target.files[0]); 
      if (configUploadertext) configUploadertext.style.display = 'none';
      if (selectClassText) selectClassText.style.display = 'block';
      if (selectClassSelect) selectClassSelect.onchange = async (event: any) => {
        config.selectClass(event.target.value);
      }
      if (startButton) startButton.onclick = async (event: any) => {
        if (selectClassText) selectClassText.style.display = 'none';
        if (startButton) startButton.style.display = 'none';
        const allItems: AllItems = { helmets: [], weapons: [], boots: [], gloves: [], breastplates: []};

        if (loader) loader.style.display = 'flex';
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

        if (loadingMessage) loadingMessage.innerHTML = printConfig(config);
        if (loader) loader.style.display = 'none';
        // const genEnGenEn: GeneticEngineGeneticEngine = new GeneticEngineGeneticEngine();
        // for (let i = 0; i < 10; i++){
        //  const conf: Configuration = genEnGenEn.findBestConfig(allItems);
        // }
        
        const geneticEngine = new GeneticEngine(config, allItems);
        geneticEngine.startEvolution(<HTMLCanvasElement>metricsCanvas, <HTMLElement>characterCard, <HTMLElement>speedSlider);
      }
    };
  }
}

function printConfig(config: Configuration): string{
  let result: string = 'Population Size:' + config.populationSize + ' | ';
  result += 'Select quantity: ' + config.selectQuantity + ' | ';
  result += 'Mutation method: ' + config.mutate.name + ' | ';
  result += 'Selection methods: ' + config.selectionMethods[0].name + '(' + config.selectionQuantities[0] + ')' + ' and ' +
                                    config.selectionMethods[1].name + '(' + config.selectionQuantities[1] + ')' + ' | ';
  result += 'Cross method: ' + config.cross.name + ' | ';
  result += 'Implementation strategy: ' + config.replace.name + ' | ';
  result += 'Stop criterion: ' + config.stopCriterion.name + ' (' + config.stopValue + ')';
  return result;
}