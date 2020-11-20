import { BuyerLoginComponent } from '../../containers/login/buyer-login.component';
import { BuyerComponent } from '../buyer.component';
import { BuyerHomepage } from './buyer-homepage.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { ProductItemComponent } from './product-items/product-item.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const containers:any[] = [ 
    BuyerLoginComponent,
    CartItemComponent, CartComponent,
    ConfirmationPageComponent, ContactInformationComponent,
    ProductItemComponent, WishlistComponent, BuyerHomepage    
]

export * from './buyer-homepage.component';
export * from './cart/cart-item/cart-item.component';
export * from './cart/cart.component';
export * from './confirmation-page/confirmation-page.component';
export * from './contact-information/contact-information.component';
export * from './product-items/product-item.component';
export * from './wishlist/wishlist.component'