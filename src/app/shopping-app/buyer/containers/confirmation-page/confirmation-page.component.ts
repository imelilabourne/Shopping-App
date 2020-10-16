import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/shopping-app/model/cart-item.interface';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { User } from 'src/app/shopping-app/model/user.interface';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { ProductService } from 'src/app/shopping-app/services/product.service';
import { TransactService } from 'src/app/shopping-app/services/transac.service';
import { UsersService } from 'src/app/shopping-app/services/users.service';

@Component({
    selector: 'confirm-page',
    styleUrls: ['confirmation-page.component.css'],
    template: `
    <buyer-navbar></buyer-navbar>
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
                    <tr *ngFor="let order of finalOrder">
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
                        <th scope="col">Home Addres</th>    
                        <th scope="col">Email Address</th>    
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
        <button (click)="checkoutreset()" class="btn btn-info" type="button" routerLink="../cart" class="btn btn-primary">Go Back</button>
         
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
                </div>
            </div>
            </div>
    </div>
    <buyer-footer></buyer-footer>
    `
})

export class ConfirmationPageComponent{

    modalToggle = false;
    method: string = "COD";

    user: User;
    @Input() infoForm;

    cartItems:CartItem[] = [];
    products:Product[] = [];

    finalOrder: CartItem[] = [];
    constructor(private userService: UsersService, private transac: TransactService, private cartService:CartService, 
        private productService: ProductService){}

    ngOnInit(){
        this.userService.getUsers().subscribe(data => {
            data.map(user => {
                if(user.username === localStorage.getItem('user')){
                    this.user = user;
                }
            });
 
        })
        
        this.transac.getTransac().subscribe(res => {
          res.map(resp => this.finalOrder = resp);
        });

        this.productService.getProductlist().subscribe(data => this.products = data);   

    }

    modal(){
        this.modalToggle = !this.modalToggle;
       
    }
    
    checkoutreset(){
        const orderSummary = [];
        this.transac.getTransac()
        .subscribe(data => data.map(order => order.map(item => {
            orderSummary.push(item);
        })));

        this.productService.getProducts().subscribe(data => {
            data.map(product => {
                orderSummary.map(order => {
                    if(product.name === order.productName){
                        this.productService.updateStocks(product.id, {...product, stocks: product.stocks - order.qty}).subscribe();

                        this.cartService.getCartItems().subscribe(data => {
                            this.cartItems = data;
                        });


                        this.cartService.getCartItems().subscribe(data => {
                            data.map(cart => {
                                this.products.forEach(product => {
                                                if(product.stocks < cart.qty){
                                                    return this.cartService.removeProduct(cart).subscribe(res=>console.log(res));
                                                }      
                                })
                            });
                        })
                    }
                })
            })
        });

       
        this.transac.resetTransac().subscribe()

            
    }

}