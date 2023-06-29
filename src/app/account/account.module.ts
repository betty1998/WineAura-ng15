import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProfileComponent} from "./profile/profile.component";
import {RouterModule, Routes} from "@angular/router";
import {FavoriteComponent} from "./favorite/favorite.component";
import {AddressBookComponent} from "./address-book/address-book.component";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {CustomStyleModule} from "../shared/modules/custom-style/custom-style.module";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import { OrderDialogComponent } from './order-history/order-dialog/order-dialog.component';
import {AppModule} from "../app.module";
import { AddressDialogComponent } from './address-book/address-dialog/address-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UpdatePasswordDialogComponent } from './profile/update-password-dialog/update-password-dialog.component';
import {ProfileEditDialogComponent} from "./profile/profile-edit-dialog/profile-edit-dialog.component";
import { AccountComponent } from './account.component';

const routes:Routes=[

]

@NgModule({
  declarations: [
    FavoriteComponent,
    ProfileComponent,
    AddressBookComponent,
    OrderHistoryComponent,
    OrderDialogComponent,
    AddressDialogComponent,
    ProfileEditDialogComponent,
    UpdatePasswordDialogComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    CustomStyleModule,
    MatDividerModule,
    MatListModule,
    RouterModule.forChild(routes),
    AppModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
