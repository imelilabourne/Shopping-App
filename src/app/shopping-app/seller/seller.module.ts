import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { SellerNavbarComponent } from './components/seller-navbar/seller-navbar.component';
import { SellerFooterComponent } from './components/seller-footer/seller-footer.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortPipe } from '../pipes/sort.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SellerTransactComponent } from './seller-transact/seller-transact.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SharedModule } from '../shared/shrared.module';

@NgModule({
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    SharedModule
  ],
  declarations: [SellerComponent, SellerNavbarComponent, SellerFooterComponent,
  SellerDashboardComponent,

  SellerTransactComponent,
  SellerComponent,
  UpdateProductComponent

],
exports: [

]
})
export class SellerModule { }
