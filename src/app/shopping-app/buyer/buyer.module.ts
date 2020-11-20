import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer.component';
import { BuyerFooter, BuyerHeaderComponent, BuyerNavbarComponent } from './components';
import { BuyerHomepage, CartComponent, CartItemComponent, ConfirmationPageComponent, ContactInformationComponent, ProductItemComponent, WishlistComponent } from './containers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SortPipe } from '../pipes/sort.pipe';
import { BuyerLoginComponent } from '../containers/login/buyer-login.component';



@NgModule({
  imports: [
    CommonModule,
    BuyerRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  declarations: [
      BuyerHomepage,
      BuyerComponent,
      BuyerNavbarComponent,
      BuyerHeaderComponent,
      BuyerFooter,
      CartComponent,
      ProductItemComponent,
      CartItemComponent,
      WishlistComponent,
      BuyerLoginComponent,
      ContactInformationComponent,
      ConfirmationPageComponent,
      FilterPipe,
      SortPipe
  ],
  exports: [
    BuyerComponent,
    FilterPipe,
    SortPipe
]
})
export class BuyerModule { }
