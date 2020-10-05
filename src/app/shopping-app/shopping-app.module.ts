import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './shopping-app-routing.module';
import { BaseComponent } from './containers/base.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';

@NgModule({
  declarations: [
    BaseComponent,
    BuyerComponent,
    SellerComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule

  ],
  providers: [],
  exports:[
    BaseComponent
  ]
})
export class ShopingAppModule { }
