import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Product } from 'src/app/shopping-app/model/products.interface';

import * as fromServices from '../../../services';
import { LoadCart, RemoveCartItem} from 'src/app/store/actions/products.action';

@Component({
    selector:  `cart-component`,
    styleUrls: [`cart.component.css`],
    template: `
    <buyer-navbar></buyer-navbar>
    <div class="container main">
    {{ cartItems$ | async | json}}
        <div *ngIf="cartItems.length === 0" style="z-index:0" class="alert alert-danger">Your cart is empty, <a routerLink="shop">show now</a></div>
        <br>
        <div *ngIf="cartItems.length > 0" >
            <h5 class="heading" >My Cart</h5>

            <div class="cartpopup">
                <div class="container">
                    <div class="row">   
                    </div>
                </div>
                    <cart-item *ngFor="let cart of (cartItems$ | async)" (itemSelected)="removeItem($event)" [cartItem] ="cart"></cart-item >
            </div>
            <div class="flex">
                <div class="grand">Grand Total: {{grandTotal | currency: 'Php '}}</div>
                <div>
                    <button class="" (click)="placeOrder()">Place Order</button>
                </div>
            </div>
        </div>
    </div>
    <br><br>
    <buyer-footer></buyer-footer>
    `
})

export class CartComponent{
    cartItems= [];
    products:Product[] = []
    grandTotal: number = 0;
    user: string = localStorage.getItem('user');
    available: boolean = true;
    cartItems$:Observable<any>;

    constructor(
        private messengerService: fromServices.MessengerService, 
        private cartService: fromServices.CartService, 
        private transacService: fromServices.TransactService, 
        private userService: fromServices.UsersService,
        private router: Router,
        // private productService: fromServices.ProductService,
        private store: Store<AppState>
    ){}

    ngOnInit(){

        this.getUserCartItems();
        this.handleSub();
        this.accumulatedPrice();
        // this.productService.getProducts().subscribe(data => {
        //     return this.cartItems = this.cartItems.filter(cartItem => {
        //         const tempCart = [];
        //         for(let i of data){
        //             if(cartItem.qty <= i.stocks && cartItem.productName === i.name){
        //                 return tempCart.push(cartItem);
        //             }
        //         }
        //     })
        // });

        this.cartItems$ = this.store.select(store => store.carts.list)
        this.store.dispatch(new LoadCart());
      

    }

  

    handleSub(){
        this.messengerService.getMsg()
            .subscribe(() => {
                this.getUserCartItems();
                this.accumulatedPrice();        
        })
    }

    getUserCartItems(){
        const user = localStorage.getItem('user')
        this.cartService.getCartItems()
        .subscribe(data => {
            data.map(item => {
               if(item.customerName){
                   return this.cartItems = data.filter(each => user === each.customerName );

               }
            })
        });
    }

    accumulatedPrice(){
        this.cartService.getCartItems()
        .subscribe(data => {
            data.map((dat)=> {
                if(dat.customerName === localStorage.getItem('user')){
                    this.grandTotal += dat.qty * dat.price;
                }
            });
        });
    }

    removeItem(event){
        // this.cartService.removeProduct(event).subscribe(() => {
        //     this.cartItems = this.cartItems.filter(item =>{
        //             this.grandTotal -= item.price * item.qty; 
        //             return item != event;
        //     });
        //         this.accumulatedPrice();
        // });

        this.store.dispatch(new RemoveCartItem(event));
    }

    placeOrder(){
        this.userService.getUsers().subscribe(users => {
            users.forEach(user => {
                if(user.username === localStorage.getItem('user')){
                    this.transacService.postTransact(this.cartItems)
                    .subscribe(()=>{
                        this.router.navigateByUrl('success')
                });
                }
            });
        });
    }
}