import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, OnInit,
  Renderer2, ViewChild,
} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";


@Component({
  selector: "app-admin",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements AfterViewInit, OnInit{
  show: boolean = true;
  showSide: boolean = false;
  @ViewChild('myrouter') routerRef!: ElementRef;

  constructor(private renderer: Renderer2, private el: ElementRef,
              private router:Router, public auth:AuthService) {
    // this.showSide = auth.admin ? true : false;
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.routerRef.nativeElement.style.marginLeft = this.showSide ? "330px" : "0";
  }



  logout() {
    this.auth.adminLogout();
    // Get current URL.
    let currentUrl = this.router.url;

    // Navigate away and then back to trigger route guards.
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });

  }

  toggle() {
    this.show = !this.show;
  }

  toggleSide(event:Event) {
    event.stopPropagation();
    this.showSide = !this.showSide;
    this.routerRef.nativeElement.style.marginLeft = this.showSide ? "330px" : "0";
    console.log(this.showSide);
  }
}
