import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './shopping-app/shopping-app-routing.module';
import { ShopingAppModule } from './shopping-app/shopping-app.module';
import { SortPipe } from './shopping-app/pipes/sort.pipe';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './store/reducers/products.reducer';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShopingAppModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
