import { Component } from '@angular/core';
import { CartItem } from 'src/app/shopping-app/model/cart-item.interface';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { MessengerService } from 'src/app/shopping-app/services/messenger.service';

@Component({
    selector:  `cart-component`,
    styleUrls: [`cart.component.css`],
    template: `
    <div>
        <div *ngIf="cartItems.length === 0" style="z-index:0" class="alert alert-danger">Your cart is empty</div>
        <br>
        <div *ngIf="cartItems.length > 0" class="alert alert-info cartpopup">
            <button class="btn btn-outline-primary">X</button>
            <ul>
                <li class="list-group-item" *ngFor="let cart of cartItems">
                    <cart-item (itemSelected)="removeItem($event)" [cartItem] ="cart"></cart-item>
                </li>

                <li class="list-group-item active">
                    <p>Grand Total: {{grandTotal | currency: 'Php '}} </p>
                </li>
            </ul>
        </div>

        
        
    </div>
    `
})

export class CartComponent{
    cartItems= [
        // { id: 1, productId: 1, productName: "Product1", qty: 4, price: 100 },
        // { id: 2, productId: 2, productName: "Product2", qty: 10, price: 1000 },
        // { id: 3, productId: 3, productName: "Product3", qty: 1, price: 30 },
        // { id: 4, productId: 4, productName: "Product4", qty: 3, price: 150 }
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
        this.cartItems.forEach(item => {
            this.grandTotal += (item.price * item.qty)
        })
    }

    removeItem(event){
        this.cartItems = this.cartItems.filter(item => item != event);
        this.cartService.removeProduct(event).subscribe((data) => console.log("successful" + data));
    }
}