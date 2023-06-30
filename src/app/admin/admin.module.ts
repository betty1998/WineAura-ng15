import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbCardModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule} from "@nebular/theme";
import { AdminComponent } from './admin.component';
import {RouterModule, Routes} from "@angular/router";

const routes:Routes =[
  {
    path:"",
    component:AdminComponent
  }
]

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    NbThemeModule.forRoot(),
    NbCardModule,
    RouterModule.forChild(routes),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot()
  ],
})
export class AdminModule { }
