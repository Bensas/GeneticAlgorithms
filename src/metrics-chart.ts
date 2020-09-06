import { GeneticEngineMetrics } from "./genetic-engine-metrics";

const chartjs = require('chart.js');
const INITIAL_CONFIG = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Min Fitness',
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
export class MetricsChart {
  ctx: any;
  chart: any;
  config: any = INITIAL_CONFIG;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
		this.chart = new chartjs.Chart(this.ctx, this.config);
  }

  public updateChart(metrics: GeneticEngineMetrics) {
    this.config.data.datasets[0].data.push(metrics.minFitness);
    this.config.data.datasets[1].data.push(metrics.averageFitness);
    this.config.data.labels.push(metrics.generationNumber);
    this.chart.update();
    console.log(this.config.data.datasets[0].data);

  }

  
}