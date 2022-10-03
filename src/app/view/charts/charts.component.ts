import { Component, Inject, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartsResultService } from './chartsResultService.service';
import { ChartDataModel } from './model/charts-data.model';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor( @Inject(ChartsResultService) private service: ChartsResultService) { }

  data: ChartDataModel[]= [{
    summarizeValueCounter : null,
    summarizeValueAllProductsValue : '',
    summarizeValueAllProductsValueWhereTaxIsMonofasica : '',
    summarizeValueAllProductsValueWhereTaxIsNormal : '',
    summarizeValueAllProductsValueWhereTaxIsAliqZero : '',
    valorPis : '',
    valorCofins : '',
    summarizeValueWhereTaxIsMonofasicaCounter : null,
    summarizeValueWhereTaxIsNormalCounter : null,
    summarizeValueWhereTaxIsAliqZeroCounter : null,
    bonusExit : '',
    bonusEntrance : '',
    onusExit : '',
    onusEntrance : '',
    subtotalAliqZero : '',
    subtotalMonofasica : '',
    countNcmNull : null,
    calcBaseBonus : '',
    cofinsBonus : '',
    pisBonus : '',
    calcBaseOnus : '',
    pisOnus : '',
    cofinsOnus : ''
  }]

  loading: boolean = true
  temosDados: boolean = true

  ngOnInit() : void {
    //this.generateDashboardData();
    // this.createBarGraph();
    // this.createDonotsGraph();
    // this.createPolarAreaChart();
    this.setAsyncData()
  }


  setAsyncData() {
    this.service.generateData().subscribe((res) => {
      console.log(res)
      this.data = [res];
      this.createBarGraph();
      this.createDonotsGraph();
      this.createPolarAreaChart();
      this.loading = false;
    },
    (error) => {
      console.error(error.message)
      this.loading = false;
      this.temosDados = false;
    })
  }

  createBarGraph() {
    var myChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ['Monofásica', 'Normal', 'Aliquota Zero'],
        datasets: [{
          label: '#',
          data: [
          Number(this.data[0]?.summarizeValueWhereTaxIsAliqZeroCounter),
          Number(this.data[0]?.summarizeValueWhereTaxIsNormalCounter),
          Number(this.data[0]?.summarizeValueWhereTaxIsMonofasicaCounter)],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

  createDonotsGraph() {
    var doughnutChart = new Chart("doughnutChart", {
      type: 'doughnut',
      data: {
        labels: [
          'Monofásica', 'Normal', 'Aliquota Zero'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [
          Number(this.data[0]?.summarizeValueAllProductsValueWhereTaxIsMonofasica),
          Number(this.data[0]?.summarizeValueAllProductsValueWhereTaxIsNormal),
          Number(this.data[0]?.summarizeValueAllProductsValueWhereTaxIsAliqZero)],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }

    });
  }

  createPolarAreaChart() {
    var polarAreaChart = new Chart("polarAreaChart", {
      type: 'polarArea',
      data: {
        labels: [
          'Monofásica', 'Normal', 'Aliquota Zero'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [
          Number(this.data[0]?.summarizeValueAllProductsValueWhereTaxIsMonofasica),
          Number(this.data[0]?.summarizeValueAllProductsValueWhereTaxIsNormal),
          Number(this.data[0]?.summarizeValueAllProductsValueWhereTaxIsAliqZero)
        ],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(54, 162, 235)'
          ]
        }]
      }
    });

  }
}
