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
                <div class="">
                <!-- <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Product Total</th>
                        <th scope="col">Act</th>
                        </tr>
                    </thead>
                    <tbody> -->
                    <tr *ngFor="let cart of cartItems">
                    <p class="cart-list" >
              
                        <cart-item (itemSelected)="removeItem($event)" [cartItem] ="cart"></cart-item >
                    </p>
                    </tr>
 
                    <!-- </tbody>
                    </table> -->
                    <p class="float-right">Grand Total: {{grandTotal | currency: 'Php '}} </p>
                  
                </div>
                <br><br>
                <button class="float-right" routerLink="/success">Place Order</button>
        </div>
        
    </div>
    `
})

export class CartComponent{
    cartItems= [
    ]

    grandTotal: number = 0;
       
    ngOnInit(){
        this.getUserCartItems();
        this.handleSub();
        // this.loadCartItems();
        this.accumulatedPrice()
    }

    constructor(private messengerService: MessengerService, private cartService: CartService){}

    handleSub(){
        this.messengerService.getMsg()
            .subscribe((data:Product) => {
                // this.addtoCart(data);
                // this.loadCartItems();
                this.getUserCartItems();

                this.accumulatedPrice();
                
            })
    }

    getUserCartItems(){
        const user = localStorage.getItem('user');
        this.cartService.getCartItems()
        .subscribe(data => {
            data.map(item => {
               if(item.customerName === user){
                   return this.cartItems = data.filter(each => user === each.customerName );
               }

                // if(user === 'user1'){
                //     this.cartItems = item.customerName;
                // }
                
            })
            
        });
        // if(user === )
    }

    // loadCartItems(){
    //     this.cartService.getCartItems().subscribe((item: CartItem[]) =>{
    //         this.cartItems = item;
    //     })
    // }


    accumulatedPrice(){
        this.cartService.getCartItems()
        .subscribe(data => {
            data.map((dat)=> {
                if(dat.customerName === localStorage.getItem('user')){
                    this.grandTotal += dat.qty * dat.price;
                }

            })
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

        this.cartService.removeProduct(event).subscribe(() => {
            this.accumulatedPrice();
            // this.cartItems.filter(item =>{
            //     if(event.qty > 1){
            //         return event--;
            //     }
            //     else{
            //         return item != event;
            //     }
            // })
        });
    }
}