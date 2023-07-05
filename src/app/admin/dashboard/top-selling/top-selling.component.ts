import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ProductSold} from "../../../shared/model/ProductSold";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.scss']
})
export class TopSellingComponent implements OnChanges,OnInit{
  @Input()
  topSelling!: ProductSold[]|null;
  topSellingColumns: string[] = ['id','productImage', 'productName','sold'];
  @ViewChild(MatTable)
  table!: MatTable<ProductSold>;
  constructor() { }

  ngOnInit(): void {
  }



  ngOnChanges(): void {
    this.topSelling?.forEach((productSold,index)=>{
      productSold.id = index+1;
    });
    console.log("topSelling",this.topSelling)
  }


}

