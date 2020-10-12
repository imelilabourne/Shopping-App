import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/shopping-app/model/cart-item.interface';
import { User } from 'src/app/shopping-app/model/user.interface';
import { TransactService } from 'src/app/shopping-app/services/transac.service';
import { UsersService } from 'src/app/shopping-app/services/users.service';

@Component({
    selector: 'confirm-page',
    styleUrls: ['confirmation-page.component.css'],
    template: `
    <div class="container main">

        <h4>Select Payment Method</h4>
        <button class="btn btn-info">COD</button>
        <button (click)="method = 'Paypal'" class="btn btn-info">Paypal</button>
        <button (click)="method = 'Gcash'" class="btn btn-info">Gcash</button>
    <br><br>
        <h5>Order Summary</h5>
        <div>
            <table class="table table-ligth">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>    
                        <th scope="col">Quantity</th>    
                        <th scope="col">Price</th>    
                    </tr>
                    
                </thead>
                <tbody>
                    <tr *ngFor="let order of finalOrder" >
                        <td>{{ order.productName }}</td>
                        <td>{{ order.qty }}</td>
                        <td>{{ order.price }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h5>Delivery Details</h5>
        <div>
            <table class="table table-ligth">
                <thead>
                    <tr>
                        <th scope="col">Customer Name</th>    
                        <th scope="col">Quantity</th>    
                        <th scope="col">Price</th>    
                        <th scope="col">Contact Number</th>    
                        <th scope="col">Payment Method</th>    
                    </tr>
                    
                </thead>
                <tbody>
                    <tr >
                        <td>{{ user?.fname }} {{ user?.lname }}</td>
                        <td>{{ user?.homeadd }}</td>
                        <td>{{ user?.email }}</td>
                        <td>{{ user?.contact }}</td>
                        <td>{{ method }}</td>
                    </tr>

                </tbody>
            </table>
        </div>
        <button (click)="modal(); checkoutreset()" class="btn btn-info" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Check out</button>
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
                    Order Completed!  
                    Thank you for shopping with us
                    <div><a data-dismiss="modal" routerLink="../">Continue Shopping 🛒</a></div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
                </div>
            </div>
            </div>
    </div>
    `
})

export class ConfirmationPageComponent{

    modalToggle = false;
    method: string = "COD";

    user: User;
    @Input() infoForm;

    finalOrder: CartItem[] = [];
    constructor(private userService: UsersService, private transac: TransactService){}

    ngOnInit(){
        this.userService.getUsers().subscribe(data => {
            data.map(user => {
                if(user.username === localStorage.getItem('user')){
                    this.user = user;
                }
            });
 
        })
        
        this.transac.getTransac().subscribe( res => {
            this.finalOrder = [...res[0].cartItems];
        })

    }

    modal(){
        this.modalToggle = !this.modalToggle;
       
    }
    
    checkoutreset(){
        this.transac.resetTransac().subscribe()
    }
 
}