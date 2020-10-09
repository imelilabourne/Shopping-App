import { Component } from '@angular/core';

@Component({
    selector: 'confirm-page',
    styleUrls: ['confirmation-page.component.css'],
    template: `
    <div class="container main">

        <h4>Select Payment Method</h4>
        <button class="btn btn-info">COD</button>
        <button class="btn btn-info">Paypal</button>
        <button class="btn btn-info">Gcas</button>
        <div><a routerLink="/shop">Continue Shopping!</a></div>

        <h5>Order Summary</h5>
        <div>
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>    
                        <th scope="col">Quantity</th>    
                        <th scope="col">Price</th>    
                    </tr>
                    
                </thead>
                <tbody>
                    <tr>
                        <td>Adidas 270</td>
                        <td>2</td>
                        <td>200.00</td>
                    </tr>
                    <tr>
                        <td>Nike Airforce 270</td>
                        <td>1</td>
                        <td>4000.00</td>
                    </tr>

                </tbody>
            </table>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Shoopoo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Thank you for shopping with us
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
                </div>
            </div>
            </div>
        </div>
        <button (click)="hello()" class="btn btn-info" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Check out</button>
    </div>
    `
})

export class ConfirmationPageComponent{

    heello = false;

    hello(){
        this.heello = !this.heello;
    }
}