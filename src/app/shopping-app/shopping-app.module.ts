import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // to use ngModel
import { DataTablesModule} from 'angular-datatables';
import { HttpModule } from '@angular/http';


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
import { SellerDashboardComponent} from './seller/seller-dashboard/seller-dashboard.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component';
import { BuyerLoginComponent } from './containers/login/buyer-login.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { BuyerFooter } from './buyer/components/footer/buyer-footer.component';
import { AuthGuard } from './auth.guard';
import { SellerNavbarComponent } from './seller/components/seller-navbar/seller-navbar.component';
import { SellerFooterComponent } from './seller/components/seller-footer/seller-footer.component';
import { SellerTransactComponent } from './seller/seller-transact/seller-transact.component';



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
    BuyerLoginComponent,
    SellerDashboardComponent,
    UpdateProductComponent,
    BuyerFooter,
    routingComponents,
    FilterPipe,
    SortPipe,
    SellerNavbarComponent,
    SellerFooterComponent,
    SellerTransactComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,    
    DataTablesModule

  ],
  providers: [AuthGuard],
 
  exports:[
    BaseComponent
  ]
})
export class ShopingAppModule { }
