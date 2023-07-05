import {Directive, ElementRef, HostBinding, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[admin-tab-title]'
})
export class AdminTabTitleDirective implements OnInit{

  constructor(private el: ElementRef) {
  }


  ngOnInit(): void {
    this.el.nativeElement.style.fontWeight = 'bold';
    this.el.nativeElement.style.fontSize = '30px';
    this.el.nativeElement.style.marginBottom = '30px';
  }
}
