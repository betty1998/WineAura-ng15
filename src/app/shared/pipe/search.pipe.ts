import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../model/Product";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], searchText:string): Product[] {
    const result: Product[] = [];
    if (!value || searchText === '') {
      return value;
    }
    value.forEach(p =>{
      if (p.name.trim().toLowerCase().includes(searchText.toLowerCase())) {
        result.push(p);
      }
    })
    return result;
  }

}
