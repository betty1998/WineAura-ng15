import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss']
})
export class TotalSalesComponent implements OnInit{
  @Input()
  title!: string;

  @Input()
  total!:string;

  @Input()
  change!:number;

  @Input()
  sign!: string;


  ngOnInit(): void {

  }

}
