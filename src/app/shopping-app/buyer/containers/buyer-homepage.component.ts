import { Component, OnInit } from '@angular/core';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { Product } from '../../model/products.interface';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
    selector: 'buyer-homepage',
    styleUrls: ['buyer-homepage.component.css'],
    template: `
    <div class="container">
        <!-- <form class="form-inline my-2 my-lg-0"> -->
        <div class="container ">
            <div class="row search">
                <div>
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort</a>

                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">by Category</a>
                                <a class="dropdown-item" href="#">by Name</a>
                                <!-- <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a> -->
                            </div>
                            
                        </li>
                    </ul>
                </div>


                <div class="searchInput">
                    <input class="form-control mr-sm-2 " type="text" placeholder="Search" [(ngModel)] = "searchProduct" aria-label="Search">
                </div>
                <div>
                    <button class="btn btn-outline-info my-2 my-sm-0" type="button"  (click)="search()" >Search</button>
                </div>
                
            </div>
        </div>
            <!-- </form> -->
        <button class="btn btn-outline-secondary clear " *ngIf="showClearBtn" (click)="clear()">All Products</button>
            

        <div class="main-products row" >
            <div class="col product" *ngFor="let product of products">
                <product-item [productItem]="product" [addedtoWishlist] = "wishlist.indexOf(product.id) >= 0" ></product-item>

            </div>
        </div>

        
    </div>
    `
})

export class BuyerHomepage{
    products: Product[] = [];
    wishlist: number[] = [];
    searchProduct: string;
    showClearBtn: boolean = false;
    
    search(){

        if(this.searchProduct !== ""){
            this.products = this.products.filter(item => item.name.toLowerCase().includes(this.searchProduct.toLowerCase()));
        }
        else{
            this.ngOnInit();
        }
        this.showClearBtn = true;
        // this.products.filter(res => {
        //     console.log(res.name.toLocaleLowerCase().match(this.searchProduct.toLocaleLowerCase()));
        // })
    }
    clear(){
        this.showClearBtn =false;
        this.ngOnInit();    
    }

    constructor(
        private productService: ProductService, 
        private wishlistService: WishlistService){
    }
    ngOnInit(){
        this.loadProducts();
        this.loadWishlist();
    }

    addCart(){
        console.log(this.productService.getProducts());
    }

    loadProducts(){
        this.productService.getProducts()
        .subscribe(data => this.products = data);
    }

    loadWishlist(){
        this.wishlistService.getWishlist()
            .subscribe(productIds => this.wishlist = productIds)
    }

}