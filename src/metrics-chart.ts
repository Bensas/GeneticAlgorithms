import { GeneticEngineMetrics } from "./genetic-engine-metrics";

const chartjs = require('chart.js');
const INITIAL_CONFIG = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Max Fitness',
      backgroundColor: 'rgb(255, 99, 132)', //Red
      borderColor: 'rgb(255, 99, 132)', //Red
      data: [],
      fill: false,
    }, {
      label: 'Average Fitness',
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)', //Blue
      borderColor: 'rgb(54, 162, 235)', //Blue
      data: [],
    }]
  },
  options: {
    responsive: true,
    mantainAspectRation: false,
    title: {
      display: true,
      text: 'Evolution'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Generation'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  }
};

const INITIAL_CONFIG_2 = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Genetic Diversity',
      backgroundColor: '#80FF95', //Green
      borderColor: '#80FF95', //Green
      data: [],
      fill: false,
    }]
  },
  options: {
    responsive: true,
    mantainAspectRatio: false,
    title: {
      display: true,
      text: 'Genetic diversity'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Generation'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  }
};
export class MetricsChart {
  ctx: any;
  chart: any;
  chart2: any;
  config: any = INITIAL_CONFIG;
  config2: any = INITIAL_CONFIG_2;

  constructor(canvas: HTMLCanvasElement) {
    // canvas.outerHTML += '<div><canvas id="geneticDiversityCanvas"></canvas></div>';
    this.ctx = canvas.getContext('2d');
    this.chart = new chartjs.Chart(this.ctx, this.config);
    let ctx2 = (<HTMLCanvasElement>document.getElementById('genetic-diversity-canvas')).getContext('2d')
    this.chart2 = new chartjs.Chart(ctx2, this.config2);
  }

  public updateChart(metrics: GeneticEngineMetrics) {
    this.config.data.datasets[0].data.push(metrics.historicalMaxFitness[metrics.historicalMaxFitness.length-1]);
    this.config.data.datasets[1].data.push(metrics.averageFitness);
    this.config.data.labels.push(metrics.generationNumber);
    this.chart.update();

    this.config2.data.datasets[0].data.push(metrics.geneticDiversity);
    this.config2.data.labels.push(metrics.generationNumber);
    this.chart2.update();
  }

  
}