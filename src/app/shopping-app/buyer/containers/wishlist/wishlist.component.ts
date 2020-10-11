import { Component } from '@angular/core';

@Component({
    selector: 'wishlist-buyer',
    template: `
    <buyer-navbar></buyer-navbar>
    <div class="container main">
  
            <!-- <button class="btn btn-outline-primary">X</button> -->
            <h5 class="list-group-item list-group-item-success" >My Wishlist</h5>
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

                        <div class="col-md-2">
                            <p class="head">Total</p>
                        </div>

                        <div class="col-md-2" >
                            <p class="head">Action</p>
                        </div>
                    </div>

                    <div class="row" >
                        <div class="col-md-1">
                            <p class="head">1</p>
                        </div>
                        
                        <div class="col-md-3" >
                            <p class="head" >Nike Airforce 270</p>
                        </div>

                        <div class="col-md-2">
                            <p class="head">2</p>
                        </div>

                        <div class="col-md-2">
                            <p class="head">2,700</p>
                        </div>

                        <div class="col-md-2">
                            <p class="head">5,400</p>
                        </div>

                        <div class="col-md-2" >
                            <button class="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
             
            </div>
                
             
        </div>
        

    `
})

export class WishlistComponent{}