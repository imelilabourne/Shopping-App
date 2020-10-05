import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './shopping-app-routing.module';
import { BaseComponent } from './containers/base.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { BuyerNavbarComponent } from './buyer/components/navbar/buyer-navbar.component';
import { BuyerHomepage } from './buyer/containers/buyer-homepage.component';
import { BuyerHeaderComponent } from './buyer/components/header/buyer-header.component';

@NgModule({
  declarations: [
    BaseComponent,
    BuyerComponent,
    SellerComponent,
    BuyerNavbarComponent,
    BuyerHomepage,
    BuyerHeaderComponent,
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
