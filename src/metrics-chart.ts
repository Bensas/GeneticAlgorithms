import { GeneticEngineMetrics } from "./genetic-engine-metrics";

const chartjs = require('chart.js');
var config = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)', //Red
      borderColor: 'rgb(255, 99, 132)', //Red
      data: [
        15,
        16,
        17,
        23
      ],
      fill: false,
    }, {
      label: 'My Second dataset',
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)', //Blue
      borderColor: 'rgb(54, 162, 235)', //Blue
      data: [
        12,
        14,
        15,
        18
      ],
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

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
		this.chart = new chartjs.Chart(this.ctx, config);
  }

  public updateChart(metrics: GeneticEngineMetrics) {
    
  }

  
}