import {Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnChanges, OnInit {

  @Input()
  appRole!: string;

  @HostBinding('style.color')
  color!: string;

  constructor(private er: ElementRef) {
  }

  ngOnChanges(): void {
    console.log(this.appRole);
    if(this.appRole == "Manager"){
      this.color = "green";
    }else if(this.appRole == "Admin"){
      this.color = "red";
    }
  }

  ngOnInit(): void {

  }

}
