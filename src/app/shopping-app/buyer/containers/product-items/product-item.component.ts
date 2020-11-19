import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { User } from 'src/app/shopping-app/model/user.interface';
import { LoadUser } from 'src/app/store/actions/auth.action';
import * as fromServices from '../../../services';

@Component({
    selector: `product-item`,
    styleUrls: [`product-item.component.css`],
    template: `
    <div class="item-wrapper">
        <div class="container-fluid product">
            <div (click)="photoIsClicked = !photoIsClicked" class="img-wrapper"><img src="{{ productItem?.imageUrl }}">
            
                <div class="alert-success"  *ngIf="itemAdded">
                    <p>Item added to cart <span><button (click)="itemMsg()" class="btn ekis"><i class="fa fa-times"></i></button></span></p>
                </div> 
                <p class="sold-out" *ngIf="productItem.stocks <= 0">sold out</p>

            </div>
            <div class="details-container">
            <p class="product-details product-name">{{ productItem.name }}
                <i *ngIf="addedtoWishlist" class="fa fa-heart heart1 float-right" (click)="handleRemovefromWistlist()"></i>
                <i *ngIf="!addedtoWishlist" class="fa fa-heart heart2 float-right" (click)="handleAddtoWishlist()"></i>
            </p>
            <p class="product-details">{{ productItem.price | currency: 'Php '}}</p>
            </div>
        </div>

        <div class="container-fluid addtocart-container">
        <div class="row add-row" *ngIf="productItem.stocks !== 0  && user !== 'admin1' && user !== 'admin2'">
            <div  class="counterBtn">
                    <button [disabled]="value === min" type="button || productItem.stocks <= 0" (click)="decrement()">-</button>
                    {{ value }}
                    <button [disabled]="value === max" type="button || productItem.stocks <= 0" (click)="increment()">+</button>
            </div>
            <button  [disabled]="productItem.stocks <= 0 " (click)="handleAddtoCart()" class="addtoCart">Add to Cart</button>
        </div>
    </div>
        

        <div (click)="photoIsClicked = !photoIsClicked" class="descPopup">Description <i *ngIf="photoIsClicked" class="fa fa-minus"></i><i *ngIf="!photoIsClicked" class="fa fa-plus"></i></div>

        <div clss="desc" *ngIf="photoIsClicked === true" >
            <p>{{ productItem.description }}</p>
        </div>
        <div>
    </div>
    </div>  
`
})
export class ProductItemComponent{
    @Input() productItem: Product
    @Input() addedtoWishlist: boolean;
    itemAdded: boolean = false;
    photoIsClicked:boolean = false;
    user = localStorage.getItem('user');
    users$: Observable<User[]>;
    value = 1;

    constructor(private messengerService: fromServices.MessengerService, 
        private cartService: fromServices.CartService, 
        private wishlistService: fromServices.WishlistService, 
        private router: Router,
        private store: Store<AppState>){
    }

    ngOnInit(){
        this.users$ = this.store.select(store => store.users.list)
        this.store.dispatch(new LoadUser())
    }

    writeValue(value){
        this.value = value | 0;
    }


    step: number = 1
    min: number = 1
    max: number;

    increment(){
        if(this.value < this.productItem.stocks){
            this.value = this.value + this.step;
        }
    }

    decrement(){
        if(this.min < this.value){
            this.value = this.value - this.step;
        }

    }

        
    itemMsg(){
        this.itemAdded = false;
    }

    handleAddtoCart(){
        let userLocal = localStorage.getItem('user'); 
        this.users$.subscribe((user) => {
            user.map(userr => {
                if(userLocal === userr.username){
                    this.cartService.addProductToCart(this.productItem, localStorage.getItem('user'), this.value)
                    .subscribe(()=> {
                        this.messengerService.sendMsg(this.value);
                        this.itemAdded =true;
                    })
                }
                  else if( userLocal === null){
                    this.router.navigateByUrl("info");
                }
    
            })
            
        })
      
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