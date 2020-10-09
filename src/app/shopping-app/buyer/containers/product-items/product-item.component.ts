import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { usersUrl } from 'src/app/shopping-app/config/api';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { MessengerService } from 'src/app/shopping-app/services/messenger.service';
import { UsersService } from 'src/app/shopping-app/services/users.service';
import { WishlistService } from 'src/app/shopping-app/services/wishlist.service';


@Component({
    selector: `product-item`,
    styleUrls: [`product-item.component.css`],
    template: `
    <div class="item-wrapper">
                <div (click)="photoIsClicked = !photoIsClicked" class="img-wrapper"><img src="{{ productItem?.imageUrl }}">
               
                <div class="alert-success"  *ngIf="itemAdded">
                    <p>Item added to cart <span><button (click)="itemMsg()" class="btn ekis"><i class="fa fa-times"></i></button></span></p>
                </div></div>
            
        
                <button (click)="handleAddtoCart()" class="addtoCart">Add to Cart</button>
                <div class="desc" *ngIf="photoIsClicked === true" >
                    <p>{{ productItem.description }}</p>
                </div>
                <div>
                    <div>
                        <button [disabled]="value === min" type="button" (click)="decrement()">-</button>
                        {{ value }}
                        <button [disabled]="value === max" type="button" (click)="increment()">+</button>
                    </div>
                </div>

                <strong><p>{{ productItem.name }}
                <i *ngIf="addedtoWishlist" class="fa fa-heart heart1 float-right" (click)="handleRemovefromWistlist()"></i>
                <i *ngIf="!addedtoWishlist" class="fa fa-heart heart2 float-right" (click)="handleAddtoWishlist()"></i>
                </p>
                </strong>
                <p>{{ productItem.price | currency: 'Php '}}</p>
    </div>  
`
})

export class ProductItemComponent{
    @Input() productItem: Product
    @Input() addedtoWishlist: boolean;
    itemAdded: boolean = false;
    photoIsClicked:boolean = false;
    value = 1;
    private onTouch: Function;
    private onModelChange: Function;

    constructor(private messengerService: MessengerService, 
        private cartService: CartService, 
        private wishlistService: WishlistService, 
        private router: Router,
        private userService: UsersService){
    }

    writeValue(value){
        this.value = value | 0;
    }
    registerOnTouched(fn){
        this.onTouch = fn;
    }
    registerOnChange(fn){
        this.onModelChange = fn;
    }
    

    step: number = 1
    min: number = 1
    max: number =10


    increment(){
        if(this.value < this.max){
            this.value = this.value + this.step;
            this.onModelChange(this.value);
        }
        this.onTouch();
    }

    decrement(){
        if(this.min < this.value){
            this.value = this.value - this.step;
            this.onModelChange(this.value);
        }
        this.onTouch();
    }

        
    itemMsg(){
        this.itemAdded = false;
    }

    handleAddtoCart(){
        // this.messengerService.sendMsg(this.productItem);
  
        let userLocal = localStorage.getItem('user'); 
            this.userService.getUsers()
            .subscribe(users => users.forEach(user => {

                if(userLocal === user.username){
                    this.cartService.addProductToCart(this.productItem, localStorage.getItem('user'), this.value)
                    .subscribe(()=> {
                        this.messengerService.sendMsg(this.value);
                        this.itemAdded =true;
                    })
                }
                //   else if( userLocal !== user.username){
                //     this.router.navigateByUrl("info");
                // }
            }))
      
    }

    handleAddtoWishlist(){
        this.wishlistService.addToWishlist(this.productItem.id)
            .subscribe(()=>{
                this.addedtoWishlist = true;  
                console.log(this.productItem);
            })
    }

    handleRemovefromWistlist(){
        this.wishlistService.removeToWishlist(this.productItem.id)
            .subscribe(()=>{
                this.addedtoWishlist = false;
            })
    }
}