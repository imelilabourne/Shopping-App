import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../admin.guard';
import { SellerTransactComponent } from './seller-transact/seller-transact.component';
import { SellerComponent } from './seller.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {path: '', component: SellerComponent , canActivate: [AdminGuard]},
  {path:'updateproduct/:id',component: UpdateProductComponent},
  {path: 'transact' ,component:SellerTransactComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
