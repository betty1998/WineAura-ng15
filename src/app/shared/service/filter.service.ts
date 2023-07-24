import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Filter} from "../model/Filter";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filters = new BehaviorSubject<Filter[]>([]);
  // filters$ = this.filters.asObservable();

  // Function to add a filter
  addFilter(filter: Filter) {
    const currentFilters = this.filters.value;
    this.filters.next([...currentFilters, filter]);
  }

  // Function to remove a filter
  removeFilter(filter: Filter) {
    const currentFilters = this.filters.value;
    this.filters.next(currentFilters.filter(f => f.type !== filter.type || f.value !== filter.value));
  }

  // Function to clear all filters
  clearFilters() {
    this.filters.next([]);
  }

  removeAllPriceFilters() {
    const currentFilters = this.filters.value;
    this.filters.next(currentFilters.filter(f => f.type !== 'price'));
  }
}
