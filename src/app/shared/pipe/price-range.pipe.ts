import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../model/Product";

@Pipe({
  name: 'priceRange'
})
export class PriceRangePipe implements PipeTransform {

  transform(value: Product[],
            min:number|undefined = Number.MIN_VALUE,
            max:number|undefined = Number.MAX_VALUE):Product[] {
    min = min || Number.MIN_VALUE;
    max = max || Number.MIN_VALUE;
    return value?.filter(p => p.price<=max && p.price>=min);
  }

}
