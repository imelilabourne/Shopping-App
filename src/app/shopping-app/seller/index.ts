import { SellerFooterComponent } from './components/seller-footer/seller-footer.component';
import { SellerNavbarComponent } from './components/seller-navbar/seller-navbar.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerTransactComponent } from './seller-transact/seller-transact.component';
import { SellerComponent } from './seller.component';
import { UpdateProductComponent } from './update-product/update-product.component';

export const sellerComponents:any[] = [ 
    SellerFooterComponent, SellerNavbarComponent, 
    SellerDashboardComponent, SellerTransactComponent,
    SellerComponent, UpdateProductComponent
]

export * from './components/seller-footer/seller-footer.component';
export * from './components/seller-navbar/seller-navbar.component';
export * from './seller-dashboard/seller-dashboard.component';
export * from './seller-transact/seller-transact.component';
export * from './seller.component';
export * from './update-product/update-product.component';