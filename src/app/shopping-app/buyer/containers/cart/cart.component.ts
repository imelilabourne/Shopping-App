import { Component } from '@angular/core';
import { CartItem } from 'src/app/shopping-app/model/cart-item.interface';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { MessengerService } from 'src/app/shopping-app/services/messenger.service';

@Component({
    selector:  `cart-component`,
    styleUrls: [`cart.component.css`],
    template: `
    <buyer-navbar></buyer-navbar>
    <div class="container">
        <div *ngIf="cartItems.length === 0" style="z-index:0" class="alert alert-danger">Your cart is empty</div>
        <br>
        <div *ngIf="cartItems.length > 0" class="cartpopup">
            <!-- <button class="btn btn-outline-primary">X</button> -->
            <h5 class="list-group-item">My Cart</h5>
                <div class="container">
                    <p class="cart-list" *ngFor="let cart of cartItems">
                        <cart-item (itemSelected)="removeItem($event)" [cartItem] ="cart"></cart-item>
                    </p>
                    <p class="float-right">Grand Total: {{grandTotal | currency: 'Php '}} </p>
                </div>
                <br><br>
                <button class="btn btn-secondary float-right" routerLink="/success">Place Order</button>
        </div>

        
        
    </div>
    `
})

export class CartComponent{
    cartItems= [
    ]

    grandTotal: number = 0;
       
    ngOnInit(){
        this.handleSub();
        this.loadCartItems()
    }

    constructor(private messengerService: MessengerService, private cartService: CartService){}

    handleSub(){
        this.messengerService.getMsg()
            .subscribe((data:Product) => {
                // this.addtoCart(data);
                this.loadCartItems();
                this.accumulatedPrice();
            })
    }

    loadCartItems(){
        this.cartService.getCartItems().subscribe((item: CartItem[]) =>{
            this.cartItems = item;
        })
    }


    accumulatedPrice(){
        this.grandTotal = 0;

        this.cartItems.forEach(item => {
            this.grandTotal += (item.price * item.qty)
        })

    }

    removeItem(event){

        
        this.cartItems = this.cartItems.filter(item =>{ 
            // item != event
            if(item.qty > 1){
                return item.qty--;
            }
            else{
                return item != event;
            }
        });

        this.cartService.removeProduct(event).subscribe((data) => console.log("successful" + data));
    }
}