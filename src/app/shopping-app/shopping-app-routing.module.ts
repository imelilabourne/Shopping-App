import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerComponent } from './buyer/buyer.component';
import { CartComponent } from './buyer/containers/cart/cart.component';
import { ConfirmationPageComponent } from './buyer/containers/confirmation-page/confirmation-page.component';
import { ContactInformationComponent } from './buyer/containers/contact-information/contact-information.component';
import { BuyerLoginComponent } from './containers/login/buyer-login.component';
import { SellerComponent } from './seller/seller.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component'



const routes: Routes = [
  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: 'shop', component: BuyerComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: BuyerLoginComponent},
  {path: 'info', component: ContactInformationComponent},
  {path: 'success', component: ConfirmationPageComponent},
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
  UpdateProductComponent,
  ContactInformationComponent,
  ConfirmationPageComponent
]