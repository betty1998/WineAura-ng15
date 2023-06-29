import {Pipe, PipeTransform} from "@angular/core";
import {Order} from "../model/Order";
const map = new Map([
  ["Pending",1],["Shipped",2],["Delivered",3],["Refunded",4]])
@Pipe(
  {
    name:"orderSort"
  }
)
export class OrderSortPipe implements PipeTransform {
  transform(value: Order[]|null, sortBy:string): any {
    if(!value){
      return [];
    }
    if (sortBy == "Most Recent"){
      return value.sort((a,b) =>{
        const aa = new Date(a.purchaseDate|| "0");
        const bb = new Date(b.purchaseDate|| "0");
        return bb.getTime()-aa.getTime();
      })
    }else if (sortBy == "Least Recent"){
      return value.sort((a,b) =>{
        const aa = new Date(a.purchaseDate|| "0");
        const bb = new Date(b.purchaseDate|| "0");
        return aa.getTime()-bb.getTime();
      })
    }else {
      return value.sort((a,b) =>{
        return (map.get(a.status) || 0) - (map.get(b.status) || 0);
      })
    }

  }

}
