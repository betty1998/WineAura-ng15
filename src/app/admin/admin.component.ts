import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MENU_ITEMS} from "./admin-menu";

@Component({
  selector: 'app-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  menu = MENU_ITEMS;
}
