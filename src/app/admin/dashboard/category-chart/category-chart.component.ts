import {Component, Input, OnChanges} from '@angular/core';
import {Count} from "../../../shared/model/Count";
import {ChartConfiguration, ChartOptions, plugins} from "chart.js";

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss']
})
export class CategoryChartComponent implements OnChanges{
  @Input()
  categoryMap!: Count|null;
  pieChartData:{data:number[]}[]=[];
  pieChartLabels!: string[];
  pieChartOptions:ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        align:'start',
        labels: {
          font: {
            size: 16
          },
          padding: 20,
          boxWidth: 60
        }


      }
    }
  };
  pieChartLegend:boolean = true;

  ngOnChanges(): void {
    console.log("categoryMap", this.categoryMap);
    if (this.categoryMap) {
      this.pieChartData.push({data: Object.values(this.categoryMap)});
      this.pieChartLabels = Object.keys(this.categoryMap);
    }
  }

  constructor() { }





}
