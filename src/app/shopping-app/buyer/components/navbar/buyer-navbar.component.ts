import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shopping-app/services/product.service';

@Component({
    selector: 'buyer-navbar',
    styleUrls: ['buyer-navbar.component.css'],
    template: `
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#"><img src="../../../assets/icon.png" class="icon">Shopoo</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#"><i class="fa fa-home"></i> <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" routerLink="/cart"> <i class="fa fa-shopping-cart"></i></a>
            </li>  <li class="nav-item">
                <a class="nav-link" routerLink="/wishlist"> <i class="fa fa-heart"></i></a>
            </li>
            

            </ul>
            <form class="form-inline my-2 my-lg-0">
            
            <button *ngIf="user === null" class="btn btn-info" routerLink="/login" (click) = "login()">Login</button>
            <button *ngIf="user !== null" class="btn btn-info" (click) = "logout()">Logout</button>
            </form>
        </div>
        </nav>
    </div>
    `
})

export class BuyerNavbarComponent { 

    constructor(private router: Router, private productService: ProductService){}
    user = localStorage.getItem('user');
    login(){
        
    }

    ngOnInit(){

    }
    
    logout(){
        localStorage.clear();
        this.router.navigateByUrl('shop')
    }
}