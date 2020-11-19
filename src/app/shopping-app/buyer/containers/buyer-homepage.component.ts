import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { LoadUser } from 'src/app/store/actions/auth.action';
import { LoadProducts, LoadProductsSuccess } from 'src/app/store/actions/products.action';
import { ShoppingState } from 'src/app/store/reducers/products.reducer';
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
            <div class="col product" *ngFor="let product of (products | async) | filter: searchProduct: 'name' | sort:[SortbyParam, sortDirection] | paginate: { itemsPerPage: pageNumber, currentPage: p }">
                <product-item [productItem]="product" [addedtoWishlist] = "wishlist.indexOf(product.id) >= 0" ></product-item>
            </div>
         
        </div>
        <div class="paginate">
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
        <div>
            <small># of items per page </small>
            <button class="button" (click)="dec()"><i class="fa fa-minus"></i></button>
            <input disabled class="input" [value]="pageNumber">
            <button class="button" (click)="inc()"><i class="fa fa-plus"></i></button>
        </div>
       </div>
       
 

    </div>
    `
})

export class BuyerHomepage{
    products:Observable<Array<Product>>;
    wishlist: number[] = [];
    searchProduct = "";
    showClearBtn: boolean = false;
    SortbyParam = "name";
    sortDirection = "asc";
    pageNumber: number = 3;
    p;
    user = localStorage.getItem('user');
    // prod$ : Observable<Array<Product>>;
    constructor(
        private wishlistService: WishlistService,
        private store: Store<AppState>){
    }

    inc(){
        if(this.pageNumber < 6){
            this.pageNumber += 1;
        }
    }

    dec(){
        if(this.pageNumber > 1){
            this.pageNumber -= 1;
        }
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
        // this.loadProducts();
        this.loadWishlist();
        this.products = this.store.select(store => store.products.list);
        this.store.dispatch(new LoadProducts())

        
       
    }

    loadWishlist(){
        this.wishlistService.getWishlist()
            .subscribe(productIds => this.wishlist = productIds)
    }

}