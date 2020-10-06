import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component'



const routes: Routes = [
  {path: '', component: BuyerComponent},
  {path: 'seller', component: SellerComponent},
  {path:'updateproduct/:id',component: UpdateProductComponent},
  {path: '**', component: BuyerComponent},
 

]
@NgModule({

  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  BuyerComponent,
  SellerComponent,
  UpdateProductComponent
]