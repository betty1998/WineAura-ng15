import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, OnInit,
  Renderer2,
} from "@angular/core";
import {NbMenuItem} from "@nebular/theme";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";


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
      expanded: true,
      children: [
        {
          title: "Product List",
          link:"product-list",
        },
        {
          title: "Category",
          link:"category",
        },
        {
          title: "Brand",
          link:"brand",
        },
        {
          title: "Region",
          link:"region",
        }
        ]
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
      title:"Administrator",
      link:"administrator"
    },
    {
      title: "Profile",
      link: "profile",
    }
  ];
  constructor(private renderer: Renderer2, private el: ElementRef,
              private router:Router, private auth:AuthService) {
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.checkUrl(this.router.url.split('/')[2])

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects.substring(7);
        console.log(url);
        this.checkUrl(url);
      }
    })
  }

  checkUrl(url: string) {
    this.menu.forEach(item => {
      if (item.link=== url) {
        console.log(item.link);
        item.selected = true;
      } else if (item.children) {
        item.children.forEach(child => {
          if (child.link === url) {
            child.selected = true;
          }
          else {
            child.selected = false;
          }
        })
      } else {
        item.selected = false;
      }
    })
  }


  logout() {
    this.auth.logout();
  }
}
