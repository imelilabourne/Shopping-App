import { Component, OnInit } from '@angular/core';
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
            
                <div class="searchInput">
                    <input class="form-control mr-sm-2 " type="text" placeholder="Search" [(ngModel)] = "searchProduct" aria-label="Search">
                </div>
                <div>
                    <button style="margin-right: 10px" class="btn btn-outline-info my-2 my-sm-0" type="button" (click)="search()" ><i class="fa fa-search"></i></button>
                </div>
                <div>
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            
                            <!-- <a class="nav-link dropdown-toggle sort" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort</a> -->

                            <select [(ngModel)] = "SortbyParam">
                                <option disabled value="name" >Sort by</option>
                                <option value="name" >Name</option>
                                <option value="price" >Price</option>
                                <!-- <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a> -->
                            </select>
                            
                        </li>
                    </ul>
                </div>
                <div>
                    <button (click)="sortDesc()" class="btn btn-outline-info my-2 my-sm-0 sortBtn" type="button" (click)="search()"><i class="fa fa-sort"></i></button>
                 
                </div>

        
            </div>
        </div>
            <!-- </form> -->
        <button class="btn btn-outline-secondary clear " *ngIf="showClearBtn" (click)="clear()">All Products</button>

        <br>
        <!-- {{ searchProduct}} -->
        <div class="main-products row" >
            <div class="col product" *ngFor="let product of products | filter: searchProduct: 'name' | sort:[SortbyParam, sortDirection]">
                <product-item [productItem]="product" [addedtoWishlist] = "wishlist.indexOf(product.id) >= 0" ></product-item>
            </div>
        </div>
    </div>
    `
})

export class BuyerHomepage{
    products: Product[] = [];
    wishlist: number[] = [];
    searchProduct = "";
    showClearBtn: boolean = false;
    SortbyParam = "name";
    sortDirection = "asc";

    constructor(
        private productService: ProductService, 
        private wishlistService: WishlistService){
    }

    search(){
    
    }

    sortDesc(){
        if(this.sortDirection === "desc"){
            this.sortDirection = "asc";
        }
        else{
            this.sortDirection = "desc";
        }
    }

    clear(){
        this.ngOnInit();    
        this.showClearBtn =false;
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