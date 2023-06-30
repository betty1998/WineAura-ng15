import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../model/Product";
import {Filter} from "../model/Filter";
import {ProductService} from "../service/product.service";

const map = new Map();
map.set("Up to $20", [0, 20]);
map.set("$20 to $40", [20, 40]);
map.set("$40 to $60", [40, 60]);
map.set("$60 and Above", [60, Number.MAX_VALUE]);

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private prodService:ProductService) {
  }

  transform(items: Product[], filters: Filter[]|null): Product[] {
    if (!items || !filters) {
      return [];
    }
    console.log("filters: ", filters);
    if (!items || !filters || filters.length === 0) {
      setTimeout(() => this.prodService.total$.next(items.length), 0);
      // this.prodService.total$.next(items.length);
      return items;
    }

    let filteredItems = items;

    const groupedFilters = this.groupByType(filters);
    console.log(groupedFilters);

    for (let filterType in groupedFilters) {
      switch (filterType) {
        case 'price':
          // Assuming filter.value for price is a number
          filteredItems = filteredItems.filter(p =>
            groupedFilters[filterType].some(filter => {
              // get min price and max price
              const [a, b] = map.get(filter.value);
              return p.price >= a && p.price <= b;
            }));
          break;
        case 'category':
        case 'region':
        case 'brand':
          filteredItems = filteredItems.filter(p =>
            groupedFilters[filterType].some(filter => p[filterType as keyof Product] == filter.value));
          break;
      }
    }
    // this.prodService.total$.next(filteredItems.length);
    setTimeout(() => this.prodService.total$.next(filteredItems.length), 0);
    return filteredItems;
  }


  // Helper function to group filters by type
  groupByType(filters: Filter[]): { [type: string]: Filter[] } {
    return filters.reduce((grouped:{ [type: string]: Filter[] }, filter) => {
      (grouped[filter.type] = grouped[filter.type] || []).push(filter);
      return grouped;
    }, {});
  }
}
