import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BuyerComponent } from './shopping-app/buyer/buyer/buyer.component';
import { SellerComponent } from './shopping-app/seller/seller.component';

@NgModule({
  declarations: [
    AppComponent,
    BuyerComponent,
    SellerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
