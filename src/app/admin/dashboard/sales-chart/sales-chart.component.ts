import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../shared/service/order.service";
import {Order} from "../../../shared/model/Order";

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent implements OnInit{
  sales:{data:number[],label:string}[]=[];
  orders!: Order[];

  constructor(private orderService:OrderService) {
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(res=>{
      if (res.success) {
        this.orders = res.data;
        this.sales.push({data:this.groupByMonth(this.orders),label:"Pending"});
        console.log(this.sales);

      } else {
        console.log(res);
        alert(res.message);
      }
    });
  }

  groupByMonth(orders: Order[]) {
    const groupedOrders: { [key: number]: any[] } = {};
    orders.filter(o=>o.status=='Pending')
      .forEach(order => {
        const date = new Date(order.purchaseDate||"0");
        const month = date.getMonth()||0; // 0-indexed month

        if (!groupedOrders[month]) {
          groupedOrders[month] = [];
        }
        groupedOrders[month].push(order);
      });
    console.log(groupedOrders)
    const monthlySales = [];
    for (const month in groupedOrders) {
      if (groupedOrders.hasOwnProperty(month)) {
        const ordersOfMonth = groupedOrders[month];
        const totalSales = ordersOfMonth.reduce((total, order) => total + order.subTotal, 0);
        monthlySales.push(totalSales);
      }
    }
    return monthlySales;
  }

  calculateSales(orders:Order[]) {
    return orders.filter(o=>o.status=='Pending')
      .map(o => o.subTotal)
  }

  data:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Completed'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Pending'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Cancelled'}
  ];
  labels= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  lineChartLabels = this.labels.slice(0,this.data[0].data.length);
  lineChartOptions:any = {
    responsive: true
  };

  lineChartLegend:boolean = true;

  // events
  chartClicked(e:any):void {
    console.log(e);
  }

  chartHovered(e:any):void {
    console.log(e);
  }



}
