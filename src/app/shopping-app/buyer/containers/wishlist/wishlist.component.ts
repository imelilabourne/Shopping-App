import { Component } from '@angular/core';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { ProductService } from 'src/app/shopping-app/services/product.service';
import { UsersService } from 'src/app/shopping-app/services/users.service';
import { WishlistService } from 'src/app/shopping-app/services/wishlist.service';

@Component({
    selector: 'wishlist-buyer',
    styleUrls: ['wishlist.component.css'],
    template: `
    <buyer-navbar></buyer-navbar>
    <div class="container main">
    <div *ngIf="temp.length === 0" style="z-index:0" class="alert alert-danger">Your wishlist is empty, <a routerLink="shop">show now</a></div>
    <div *ngIf="temp.length !== 0" style="z-index:0">
            <!-- <button class="btn btn-outline-primary">X</button> -->
            <h5 class="list-group-item list-group-item-success" >My Wishlist</h5>
            <div class="cartpopup">
                <div class="container">
                    <div class="row">
                         <div class="col-md-1">
                            <p class="head">ID</p>
                        </div>
                        
                        <div class="col-md-2" >
                            <p class="head" >Product Name</p>
                        </div>

                        <div class="col-md-3">
                            <p class="head">Product Image</p>
                        </div>

                        <div class="col-md-1">
                            <p class="head">Price</p>
                        </div>

                        <div class="col-md-4">
                            <p class="head">Description</p>
                        </div>

                        <div class="col-md-1">
                            <p class="head">Action</p>
                        </div>
                    </div>
                    <div class="row p-1" *ngFor="let i of temp; let ind =index" >
                        <div class="col-md-1">
                            <p >{{ ind + 1 }}</p>
                        </div>
                        
                        <div class="col-md-2" >
                            <p  >{{ i.name }}</p>
                        </div>

                        <div class="col-md-3">
                            <img src="{{ i.imageUrl }}">
                        </div>

                        <div class="col-md-1">
                            <p >{{ i.price | currency: 'Php ' }}</p>
                        </div>

                        <div class="col-md-4">
                            <p >{{ i.description }}</p>
                        </div>

                        <div class="col-md-1">
                            <button (click)="wishtoCart(i)" class="btn btn-outline-secondary">🛒</button>
                        </div>

                    </div>

                </div>
             
            </div>
            </div>
        </div>

        <buyer-footer></buyer-footer>

    `
})

export class WishlistComponent{

    constructor(private wishlistService: WishlistService, private productService: ProductService, 
        private userservice: UsersService,
        private cartService: CartService){}

    temp: Product[] = [];
    ngOnInit(){
                    let user;
                    this.wishlistService.getlist()
                    .subscribe(res =>
                    {   
                        for(let item in res){
                            if(res[item].user === localStorage.getItem('user')){
                                console.log(res[item].user);
                                user = res[item].user;
                            }
                            else if("guest" === localStorage.getItem('user')){
                                user = "guest"
                            }
                        }

                    });

                    this.productService.getProducts()
                    .subscribe(data => {
                        
                        this.wishlistService.getWishlist()
                        .subscribe(list => {
                        
                            data.filter(product => {
                                for(let i in list){
                                    if(product.id === list[i] && user){
                                        this.temp.push(product);
                                    }
                            }
                            })                     
                        });
                    })
    

    }

    wishtoCart(event){
        this.cartService.addProductToCart(event,localStorage.getItem('user'), 1).subscribe()
    }
}