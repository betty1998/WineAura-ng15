import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OrderService} from "../../../shared/service/order.service";

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class StatusFilterComponent {
  @Output()
  pickStatus = new EventEmitter<string>();
  @Input()
  statuses!: String[];

  constructor() {
  }

  onChange(event: string) {
    this.pickStatus.emit(event);
  }
}
