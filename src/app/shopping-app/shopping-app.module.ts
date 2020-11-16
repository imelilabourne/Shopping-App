import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // to use ngModel
import { DataTablesModule} from 'angular-datatables';

import * as fromComponents from '../../app/shopping-app/buyer/components'
import * as fromContainers from '../shopping-app/buyer/containers';
import { AppRoutingModule, routingComponents } from './shopping-app-routing.module';
import { BaseComponent } from './containers/base.component';
import { BuyerComponent } from './buyer/buyer.component';
import { BuyerLoginComponent } from './containers/login/buyer-login.component';

import { SellerComponent } from './seller/seller.component';
import { SellerDashboardComponent} from './seller/seller-dashboard/seller-dashboard.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component';


import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { AuthGuard } from './auth.guard';
import { SellerNavbarComponent } from './seller/components/seller-navbar/seller-navbar.component';
import { SellerFooterComponent } from './seller/components/seller-footer/seller-footer.component';
import { SellerTransactComponent } from './seller/seller-transact/seller-transact.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/reducers/products.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from '../store/effects/products.effect';
import { CartEffects } from '../store/effects/cart.effect';
import { cartReducer } from '../store/reducers/cart.reducer';




@NgModule({
  declarations: [
    BaseComponent,
    BuyerComponent,
    SellerComponent,
    fromComponents.BuyerNavbarComponent,
    fromComponents.BuyerHeaderComponent,
    fromComponents.BuyerFooter,

    fromContainers.BuyerHomepage,
    fromContainers.ProductItemComponent,
    fromContainers.CartComponent,
    fromContainers.CartItemComponent,
    BuyerLoginComponent,
    SellerDashboardComponent,
    UpdateProductComponent,
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
    AppRoutingModule,    
    DataTablesModule,
    NgxPaginationModule,
    StoreModule.forRoot({products: reducer , carts: cartReducer}),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([ProductsEffects, CartEffects])
  ],
  providers: [AuthGuard],
 
  exports:[
    BaseComponent
  ]
})
export class ShopingAppModule { }
