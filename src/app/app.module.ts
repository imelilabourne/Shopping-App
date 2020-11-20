import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/products.reducer';
import { cartReducer } from './store/reducers/cart.reducer';
import { authReducer } from './store/reducers/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/products.effect';
import { CartEffects } from './store/effects/cart.effect';
import { AuthEffect } from './store/effects/auth.effect';
import { AuthGuard } from './shopping-app/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,   
    DataTablesModule,
    NgxPaginationModule,
    StoreModule.forRoot({
      products: reducer , 
      carts: cartReducer,
      users: authReducer
    }),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([ProductsEffects, CartEffects, AuthEffect]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
