import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, OnInit,
  Renderer2, ViewChild,
} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";
import {User} from "../shared/model/User";
import {UserInfo} from "../shared/model/UserInfo";
import {UserInfoService} from "../shared/service/user-info.service";


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
              private router:Router, public auth:AuthService,
              private infoService:UserInfoService) {
    // this.showSide = auth.admin ? true : false;
  }

  ngAfterViewInit(): void {
    this.routerRef.nativeElement.style.marginLeft = this.showSide ? "330px" : "0";
  }

  ngOnInit(): void {
  }



  logout() {
    this.auth.adminLogout();
    // Get current URL.
    this.showSide = false;
    this.ngOnInit();

    // Navigate away and then back to trigger route guards.
    this.router.navigate(["/admin/login"]).catch();

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
