import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './shopping-app/shopping-app-routing.module';
import { ShopingAppModule } from './shopping-app/shopping-app.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShopingAppModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
