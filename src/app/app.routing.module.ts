import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'shop',
        loadChildren: './shopping-app/buyer/buyer.module#BuyerModule'
    },
    {
        path: 'seller',
        loadChildren: './shopping-app/seller/seller.module#SellerModule'
    },
    {
        path: '',
        redirectTo: 'shop',
        pathMatch: 'full'
    }
]
@NgModule({

  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
