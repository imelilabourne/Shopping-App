import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { usersUrl } from 'src/app/shopping-app/config/api';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { MessengerService } from 'src/app/shopping-app/services/messenger.service';
import { ProductService } from 'src/app/shopping-app/services/product.service';
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
            </div>

        </div>

        <div class="container">
            <div class="row add-row" *ngIf="productItem.stocks !== 0">
                <div  class="counterBtn">
                        <button [disabled]="value === min" type="button" (click)="decrement()">-</button>
                        {{ value }}
                        <button [disabled]="value === max" type="button" (click)="increment()">+</button>
                </div>

                <button [disabled]="productItem.stocks === 0" (click)="handleAddtoCart()" class="addtoCart">Add to Cart</button>
            </div>
        </div>

        <div (click)="photoIsClicked = !photoIsClicked" class="descPopup">Description <i *ngIf="photoIsClicked" class="fa fa-minus"></i><i *ngIf="!photoIsClicked" class="fa fa-plus"></i></div>
       
        <div>
            
            <p class="sold-out" *ngIf="productItem.stocks === 0">sold out</p>
        </div>

        <div class="desc" *ngIf="photoIsClicked === true" >
            <p>{{ productItem.description }}</p>
        </div>
    
        <strong>
            <p>{{ productItem.name }}
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
        private userService: UsersService,
        private productService: ProductService){
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

    ngOnInit(){
        // this.productService.getProductlist().subscribe(data => data.map(item => console.log(item.stocks)))
    }
    

    step: number = 1
    min: number = 1
    max: number;


    increment(){
        if(this.value < this.productItem.stocks){
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
                  else if( userLocal === null){
                    this.router.navigateByUrl("info");
                }
            }))
      
    }

    handleAddtoWishlist(){

        const user = localStorage.getItem('user');
        
        this.wishlistService.addToWishlist(this.productItem)
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