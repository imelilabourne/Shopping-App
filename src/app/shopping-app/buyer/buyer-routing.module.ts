import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../admin.guard';
import { AuthGuard } from '../auth.guard';
import { BuyerLoginComponent } from '../containers/login/buyer-login.component';
import { CartItem } from '../model/cart-item.interface';
import { SellerComponent, SellerTransactComponent, UpdateProductComponent } from '../seller';
import { BuyerComponent } from './buyer.component';
import { CartComponent, ConfirmationPageComponent, ContactInformationComponent, WishlistComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: BuyerComponent
  },
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard]},
  {path: 'login', component: BuyerLoginComponent},
  {path: 'info', component: ContactInformationComponent},
  {path: 'success', component: ConfirmationPageComponent, canActivate: [AuthGuard]},
  {path: '**', component: BuyerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
