import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './shopping-app-routing.module';
import { BaseComponent } from './containers/base.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { BuyerNavbarComponent } from './buyer/components/navbar/buyer-navbar.component';
import { BuyerHomepage } from './buyer/containers/buyer-homepage.component';
import { BuyerHeaderComponent } from './buyer/components/header/buyer-header.component';
import { ProductItemComponent } from './buyer/containers/product-items/product-item.component';
import { CartComponent } from './buyer/containers/cart/cart.component';
import { CartItemComponent } from './buyer/containers/cart/cart-item/cart-item.component';

@NgModule({
  declarations: [
    BaseComponent,
    BuyerComponent,
    SellerComponent,
    BuyerNavbarComponent,
    BuyerHomepage,
    BuyerHeaderComponent,
    ProductItemComponent,
    CartComponent,
    CartItemComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  exports:[
    BaseComponent
  ]
})
export class ShopingAppModule { }
