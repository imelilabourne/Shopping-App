import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/shopping-app/model/cart-item.interface';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { MessengerService } from 'src/app/shopping-app/services/messenger.service';
import { ProductService } from 'src/app/shopping-app/services/product.service';
import { TransactService } from 'src/app/shopping-app/services/transac.service';
import { UsersService } from 'src/app/shopping-app/services/users.service';

@Component({
    selector:  `cart-component`,
    styleUrls: [`cart.component.css`],
    template: `
    <buyer-navbar></buyer-navbar>
    <div class="container main">
        <div *ngIf="cartItems.length === 0" style="z-index:0" class="alert alert-danger">Your cart is empty, <a routerLink="shop">show now</a></div>
        <br>
        <div *ngIf="cartItems.length > 0" >
            <h5 class="heading" >My Cart</h5>

            <div class="cartpopup">
                <div class="container">
                    <div class="row">   
                    </div>
                </div>
                    <cart-item *ngFor="let cart of cartItems" (itemSelected)="removeItem($event)" [cartItem] ="cart"></cart-item >
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

    ngOnInit(){

        this.getUserCartItems();
        this.handleSub();
        this.accumulatedPrice();
        this.productService.getProducts().subscribe(data => {
            return this.cartItems = this.cartItems.filter(cartItem => {
                const tempCart = [];
                for(let i of data){
                    // return cartItem.qty <= i.stocks;
                    if(cartItem.qty <= i.stocks && cartItem.productName === i.name){
                        return tempCart.push(cartItem);
                    }
                    
                    
                }
            })
        });
    }

    constructor(
        private messengerService: MessengerService, 
        private cartService: CartService, 
        private transacService: TransactService, 
        private userService: UsersService,
        private router: Router,
        private productService: ProductService
    ){}

    handleSub(){
        this.messengerService.getMsg()
            .subscribe(() => {
                this.getUserCartItems();
                this.accumulatedPrice();        
        })
    }

    getUserCartItems(){
        const user = localStorage.getItem('user');
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
        this.cartService.removeProduct(event).subscribe(() => {
            this.cartItems = this.cartItems.filter(item =>{
                    this.grandTotal -= item.price * item.qty; 
                    return item != event;
            });
                this.accumulatedPrice();
        });
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