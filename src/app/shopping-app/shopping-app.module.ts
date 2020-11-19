import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule} from 'angular-datatables';

import * as fromComponents from '../../app/shopping-app/buyer/components'
import * as fromContainers from '../shopping-app/buyer/containers';
import * as fromSeller from '../shopping-app/seller';

import { AppRoutingModule, routingComponents } from './shopping-app-routing.module';
import { BaseComponent } from './containers/base.component';
import { BuyerComponent } from './buyer/buyer.component';
import { BuyerLoginComponent } from './containers/login/buyer-login.component';

import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { AuthGuard } from './auth.guard';

import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/reducers/products.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from '../store/effects/products.effect';
import { CartEffects } from '../store/effects/cart.effect';
import { cartReducer } from '../store/reducers/cart.reducer';
import { authReducer } from '../store/reducers/auth.reducer';
import { AuthEffect } from '../store/effects/auth.effect';




@NgModule({
  declarations: [
    BaseComponent,
    BuyerComponent,
    BuyerLoginComponent,
    fromComponents.components,
    fromContainers.containers,
    fromSeller.sellerComponents,
    routingComponents,
    FilterPipe,
    SortPipe,
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
    StoreModule.forRoot({
      products: reducer , 
      carts: cartReducer,
      users: authReducer
    }),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([ProductsEffects, CartEffects, AuthEffect])
  ],
  providers: [AuthGuard],
 
  exports:[
    BaseComponent
  ]
})
export class ShopingAppModule { }
