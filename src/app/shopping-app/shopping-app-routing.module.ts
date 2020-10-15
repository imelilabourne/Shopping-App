import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';
import { BuyerComponent } from './buyer/buyer.component';
import { CartComponent } from './buyer/containers/cart/cart.component';
import { ConfirmationPageComponent } from './buyer/containers/confirmation-page/confirmation-page.component';
import { ContactInformationComponent } from './buyer/containers/contact-information/contact-information.component';
import { WishlistComponent } from './buyer/containers/wishlist/wishlist.component';
import { BuyerLoginComponent } from './containers/login/buyer-login.component';
import { SellerComponent } from './seller/seller.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component'
import { SellerTransactComponent } from './seller/seller-transact/seller-transact.component';


const routes: Routes = [
  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: 'shop', component: BuyerComponent},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard]},
  {path: 'login', component: BuyerLoginComponent},
  {path: 'info', component: ContactInformationComponent},
  {path: 'success', component: ConfirmationPageComponent, canActivate: [AuthGuard]},
  {path: 'seller', component: SellerComponent , canActivate: [AdminGuard]},
  {path:'updateproduct/:id',component: UpdateProductComponent},
  {path: 'transact' ,component:SellerTransactComponent},
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
  ConfirmationPageComponent,
  WishlistComponent
]