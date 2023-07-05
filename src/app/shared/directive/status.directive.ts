import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import {OrderService} from "../service/order.service";

@Directive({
  selector: '[appStatus]'
})
export class StatusDirective implements OnChanges{
  // change the background color according to the status
  @Input()
  appStatus!: string; // status

  statusColors!: {[key:string]:string};
  constructor(private orderService:OrderService,
              private er:ElementRef) {
    this.statusColors = this.orderService.statusColors;

  }

  ngOnChanges(): void {
    this.er.nativeElement.style.color = "white";
    this.er.nativeElement.style.backgroundColor = this.statusColors[this.appStatus];
    this.er.nativeElement.style.borderRadius = "20px";
    this.er.nativeElement.style.width = "100px";

  }

}
