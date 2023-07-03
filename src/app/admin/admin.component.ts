import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, OnInit,
  Renderer2,
} from "@angular/core";
import {NbMenuItem} from "@nebular/theme";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";


@Component({
  selector: "app-admin",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements AfterViewInit, OnInit{
  menu:NbMenuItem[] = [
    {
      title: "Dashboard",
      link:"dashboard"
    },
    {
      title:"Product",
      link:"product"
    },
    {
      title: "Order",
      link:"order"
    },
    {
      title:"Customer",
      link:"customer"
    },
    {
      title:"Category",
      link:"category"
    },
    {
      title:"Administrator",
      link:"administrator"
    },
    {
      title: "Profile",
      expanded: true,
      children: [
        {
          title: "Change Password",
          link:"profile",
        },
        {
          title: "Logout",
          link:"profile",
        },
      ],
    },
  ];
  constructor(private renderer: Renderer2, private el: ElementRef,
              private router:Router, private route:ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    // const aTags:NodeList = this.el.nativeElement.querySelectorAll("nb-menu a");


  }

  ngOnInit(): void {
    this.checkUrl(this.router.url.split('/')[2])

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects.split('/')[2];
        console.log(url);
        this.checkUrl(url);
      }
    })
  }

  checkUrl(url: string) {
    this.menu.forEach(item => {
      if (item.link === url) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    })
  }


}
