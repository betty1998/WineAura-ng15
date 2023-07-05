import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-sales-chart-header',
  template: `
      <div class="d-flex justify-content-between m-3">
        <div class="title">Sales Performance</div>
        <mat-form-field appearance="outline">
          <select matNativeControl (change)="sendData($event)" [value]="period">
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </mat-form-field>
      </div>
  `,
  styles: [`
    .title{
      font-size: 27.5px;
      font-weight: bold;
    }
  `]
})
export class SalesChartHeaderComponent {
  @Output()
  periodChange =new EventEmitter<string>();

  @Input()
  period!:string;


  sendData(event: Event) {
    const period = (event.target as HTMLSelectElement).value;
    this.periodChange.emit(period);
  }
}
