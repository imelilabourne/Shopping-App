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
    <div class="container main">
        <div *ngIf="cartItems.length === 0" style="z-index:0" class="alert alert-danger">Your cart is empty</div>
        <br>
        <div *ngIf="cartItems.length > 0" >
            <!-- <button class="btn btn-outline-primary">X</button> -->
            <h5 class="list-group-item list-group-item-success" >My Cart</h5>
            <div class="cartpopup">
                <div class="container">
                    <div class="row" >
                        <div class="col-md-1">
                            <p class="head">ID</p>
                        </div>
                        
                        <div class="col-md-3" >
                            <p class="head" >Product Name</p>
                        </div>

                        <div class="col-md-2">
                            <p class="head">Quantity</p>
                        </div>

                        <div class="col-md-2">
                            <p class="head">Unit Price</p>
                        </div>

                        <div class="col-md-3">
                            <p class="head">Total</p>
                        </div>

                        <div class="col-md-1" >
                            <p class="head">Action</p>
                        </div>
                    </div>
                </div>
                
                <cart-item *ngFor="let cart of cartItems;" (itemSelected)="removeItem($event)" [cartItem] ="cart"></cart-item >
            </div>
                
                <div class="float-right alert alert-success">Grand Total: {{grandTotal | currency: 'Php '}}</div>
                
                <br><br><br>
                <div>
                <button class="float-right" routerLink="/success">Place Order</button>
                 </div>
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