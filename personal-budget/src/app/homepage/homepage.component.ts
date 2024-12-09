import { AfterViewInit, Component } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19'],
      },
    ],
    labels: [],
  };

  constructor(private dataService: DataService) {}

  ngAfterViewInit(): void {
    this.dataService.fetchBudgetData().subscribe(
      (budgetData: any[]) => {
        for (let i = 0; i < budgetData.length; i++) {
          this.dataSource.datasets[0].data[i] = budgetData[i].budget;
          this.dataSource.labels[i] = budgetData[i].title;
        }
        this.createChart();
      },
      (error) => {
        console.error('Error fetching budget data:', error);
      }
    );
  }

  createChart() {
    const canvas = <HTMLCanvasElement>document.getElementById('myChart')!;
    const ctx = canvas.getContext('2d')!;
    new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }
}
