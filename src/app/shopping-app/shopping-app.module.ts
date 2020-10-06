import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
<<<<<<< Updated upstream
import { HttpClientModule } from '@angular/common/http';
=======
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // to use ngModel




>>>>>>> Stashed changes

import { AppRoutingModule, routingComponents } from './shopping-app-routing.module';
import { BaseComponent } from './containers/base.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { BuyerNavbarComponent } from './buyer/components/navbar/buyer-navbar.component';
import { BuyerHomepage } from './buyer/containers/buyer-homepage.component';
import { BuyerHeaderComponent } from './buyer/components/header/buyer-header.component';
<<<<<<< Updated upstream
import { ProductItemComponent } from './buyer/containers/product-items/product-item.component';
import { CartComponent } from './buyer/containers/cart/cart.component';
import { CartItemComponent } from './buyer/containers/cart/cart-item/cart-item.component';
=======
import { SellerDashboardComponent} from './seller/seller-dashboard/seller-dashboard.component'
import {AuthService} from './services/auth.service';
import { UpdateProductComponent } from './seller/update-product/update-product.component'
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    BaseComponent,
    BuyerComponent,
    SellerComponent,
    BuyerNavbarComponent,
    BuyerHomepage,
    BuyerHeaderComponent,
<<<<<<< Updated upstream
    ProductItemComponent,
    CartComponent,
    CartItemComponent,
    routingComponents
=======
    SellerDashboardComponent,
    
    routingComponents,
    
    UpdateProductComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    CommonModule,
<<<<<<< Updated upstream
    AppRoutingModule,
    HttpClientModule
=======
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule

>>>>>>> Stashed changes
  ],
  providers: [
    AuthService
  ],
  exports:[
    BaseComponent
  ]
})
export class ShopingAppModule { }
