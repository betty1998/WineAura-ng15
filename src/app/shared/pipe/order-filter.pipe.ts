import {Pipe, PipeTransform} from "@angular/core";
import {Order} from "../model/Order";

@Pipe(
  {
    name:"orderFilter"
  }
)
export class OrderFilterPipe implements PipeTransform{
  transform(value: Order[]|null, month:number): any {
    if(!value){
      return [];
    }
    if (month){
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - month);
      return value.filter(o => (new Date(o.purchaseDate || "0")).getTime() >= startDate.getTime());
    }
    return value;
  }
}
