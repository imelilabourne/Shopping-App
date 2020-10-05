import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';


const routes: Routes = [
  {path: '', component: BuyerComponent},
  {path: 'seller', component: SellerComponent},
  {path: '**', component: BuyerComponent},

]
@NgModule({

  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  BuyerComponent,
  SellerComponent
]