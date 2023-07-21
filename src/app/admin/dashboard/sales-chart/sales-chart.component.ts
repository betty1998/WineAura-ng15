import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {OrderService} from "../../../shared/service/order.service";
import {Order} from "../../../shared/model/Order";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent implements OnInit, OnChanges{
  chartData:{data:number[],label:string}[]=[];
  chartLabels:(string | null|undefined)[]=[];
  @Input()
  orderPeriodMap!: { [key: string]: Order[]; }|null;
  period = "week";
  @Output()
  periodChange = new EventEmitter<string>();

  constructor(private orderService:OrderService,
              private cd:ChangeDetectorRef,
              private datePipe:DatePipe){}

  ngOnInit(): void {}

  ngOnChanges(changes:SimpleChanges): void {
    this.chartData = [];
    console.log("change: ",changes);
    this.updateChart(this.orderPeriodMap||{});
  }

  updateChart(orderPeriodMap: { [key: string]: Order[]; }) {
    // assign chartLabels
    if (this.period == "week") {
      this.chartLabels = Object.keys(orderPeriodMap);
      this.chartLabels = this.chartLabels.map(key => {
        return this.datePipe.transform(key,'EE');
      });
    } else if (this.period == "month") {
      this.chartLabels = Object.keys(orderPeriodMap);
      this.chartLabels = this.chartLabels.map(key => {
        return this.datePipe.transform(key,'M/d');
      });
    } else if (this.period == "year") {
      this.chartLabels = Object.keys(orderPeriodMap);
      this.chartLabels = this.chartLabels.map(key => {
        return key?.slice(0, 3);
      });
      console.log(this.chartLabels)
    }
    console.log("chartLabels:",this.chartLabels)

    // assign chartData: calculate sales for each day
    this.calculateSales("Pending");
    this.calculateSales("Delivered");
    this.calculateSales("Cancelled");

  }


  calculateSales(status:string) {
    const tempChartData = [];
    for (const key in this.orderPeriodMap) {
      const orders = this.orderPeriodMap[key];
      const sales = orders.filter(o=>o.status==status)
        .reduce((total, order) => total + order.subTotal, 0);
      tempChartData.push(sales);
    }
    this.chartData.push({data:tempChartData,label:status});
  }


  lineChartOptions:any = {
    responsive: true,
    elements: {
      line: {
        tension: 0.5
      }
    }
  };

  lineChartLegend:boolean = true;

  // events
  chartClicked(e:any):void {
    console.log(e);
  }

  chartHovered(e:any):void {
    console.log(e);
  }


  updatePeriod(period: string) {
    this.period = period;
    console.log("period: ",period);
    this.periodChange.emit(period);
  }
}
