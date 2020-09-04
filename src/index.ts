import { Genotype } from './genotype';
import { ItemLoader } from './items/item-loader';

window.onload = () => {
  console.log('heeey mona');
  let configUploader = document.getElementById('config-uploader');
  let metricsCanvas = document.getElementById('metrics-cavas');
  console.log(configUploader);
  if (configUploader) {
    configUploader.onchange = (file) => {
      // Configuration config = Configuration.parseFile(file)
      // GeneticEngine engine = new GeneticEngine(config);
      // engine.solve(canvas); 
      console.log('heey mona');
      const itemLoader: ItemLoader = new ItemLoader();
      const allItems = itemLoader.loadItemsFromTsv('armasReduced');
      console.log(allItems);

    };
  }
    
  
}
