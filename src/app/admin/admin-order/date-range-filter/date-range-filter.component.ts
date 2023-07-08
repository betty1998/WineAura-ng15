import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.scss']
})
export class DateRangeFilterComponent {
  range!: FormGroup;
  @Output()
  pickDate = new EventEmitter<Date[]>() ;
  constructor(private fb:FormBuilder) {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  }

  applyDateFilter() {
    if (this.range.get('start')?.value && this.range.get('end')?.value) {
      this.pickDate.emit([this.range.get('start')?.value,this.range.get('end')?.value])
    }
  }

  clearDateFilter() {
    this.range.reset();
    this.pickDate.emit([]);
  }
}
