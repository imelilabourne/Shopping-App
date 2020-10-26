import { Component } from '@angular/core';
import { Product } from '../../model/products.interface';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
    selector: 'buyer-homepage',
    styleUrls: ['buyer-homepage.component.css'],
    template: `
    <div class="container con">

           
 
        <button class="btn btn-outline-secondary clear " *ngIf="showClearBtn" (click)="clear()">All Products</button>
        <br>
        <div class="main-products row" >

        <div class="search float-right">
        <div class="row">
            <div>
                <input class="searchInput" type="text" placeholder="Search" [(ngModel)] = "searchProduct" aria-label="Search">
            </div>
            <div>
                <button disabled class="searchBtn mr-sm-2 " type="button" (click)="clear()" ><i class="fa fa-search"></i></button>
            </div>
            <div >
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <select [(ngModel)] = "SortbyParam" class="select">
                            <option disabled value="name" >Sort by</option>
                            <option value="name" >Name</option>
                            <option value="price" >Price</option>
                        </select>     
                    </li>
                </ul>
            </div>
            <div>
                <button *ngIf="sortDirection === 'asc'" (click)="sortDesc()" class="sortBtn" type="button" ><i class="fa fa-sort-up"></i></button>
                <button *ngIf="sortDirection === 'desc'" (click)="sortDesc()" class="sortBtn" type="button" ><i class="fa fa-sort-down"></i></button>
            </div>
        </div>

</div>
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
    user = localStorage.getItem('user');

    constructor(
        private productService: ProductService, 
        private wishlistService: WishlistService){
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
    loadProducts(){
        this.productService.getProducts()
        .subscribe(data => this.products = data);
    }

    loadWishlist(){
        this.wishlistService.getWishlist()
            .subscribe(productIds => this.wishlist = productIds)
    }

}