import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './shopping-app/shopping-app-routing.module';
import { ShopingAppModule } from './shopping-app/shopping-app.module';


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
