import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss']
})
export class TotalSalesComponent {
  @Input()
  title!: string;

}
