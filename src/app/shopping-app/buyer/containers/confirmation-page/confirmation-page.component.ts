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
    <!--
        <div class="map">
        <img src="../../../assets/icon.png" class="image-fluid icon">
        </div>
        -->
        <div class="label">
            <a (click)="checkoutreset()" routerLink="/shop">Back to Shop</a><span>&#10095;</span>
            <a (click)="checkoutreset()" routerLink="/cart">Shopping Bag</a><span>&#10095;</span>
            <p>Checkout</p>
        </div>
    <h2 class="checkout">Checkout</h2>

    <div class="flex">
        <div>   
        
                <div class="row ship bold">
                    <p>Shipping Details</p>
                    <span (click)="editToggler()"> <i class="fa fa-pencil"></i></span>
                </div>
                <hr>
    
                <div>
                    <div class="details">
                        <div *ngIf="!editToggle">
                        <p>{{ user?.fname }} {{ user?.lname }}</p>
                        <p>{{ user?.homeadd }}</p>
                        <p>{{ user?.email }}</p>
                        <p>{{ user?.contact }}</p>
                        <p style="color: green; font-weight: bold">{{ method }}</p>
                        </div>
                        <div *ngIf="editToggle">
                            <form>
                                <input class="control" placeholder="Name" [value]="user.fname + ' ' + user.lname">
                                <input class="control" placeholder="Home Address" [value] = "user.homeadd">
                                <input class="control" placeholder="Email Address" [value] = "user.email">
                                <input class="control" placeholder="Contact Information" [value] = "user.contact">
                            </form>
                        </div>
                    </div>
                    <br>
                    <p>Select Payment Method:</p>
                    <button class="button">COD</button>
                    <button (click)="method = 'Paypal'" class="button">Paypal</button>
                    <button (click)="method = 'Gcash'" class="button">Gcash</button>
                    <br><br>

               
            </div>
        </div>
        <div class="summary-order">
        <div class="bottom">
            <p class="bold order">Your Order</p>
        </div>
        <hr>
            <table class="table table-striped">
            <tr *ngFor="let order of finalOrder">
                <td>{{ order.productName }}</td>
                <td>{{ order.qty }}</td>
                <td>{{ order.price | currency: 'Php ' }}</td><hr>
            </tr>
            </table>
            <div class="container">
                <div class="row ship">
                  <p>Sub Total</p>
                  <p>Php 2300.00</p>
                </div>
            </div>
            <div class="container">
                <div class="row ship">
                    <p>Shipping Fee</p>
                    <p>Php 150.00</p>
                </div>
            </div>
            <div class="container">
                <div class="row ship">
                    <p>Grand Total</p>
                    <p>Php 2450.00</p>
                </div>
            </div>
 
            <button (click)="showMsg()" class="button btn-block text">Add Voucher</button>
            <button (click)="modal(); checkoutreset()" class="button btn-block" type="button" data-toggle="modal" data-target="#exampleModal">Check out</button>

            <small *ngIf="showMessage">No voucher available for this item</small>

        </div>
        </div>
        <!--
        <button (click)="checkoutreset()" class="button" type="button" routerLink="../cart">Go Back</button>
        -->
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
    showMessage:boolean = false;
    editToggle:boolean = false;
    modalToggle:boolean = false;
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

    showMsg(){
        this.showMessage = true;
    }

    editToggler(){
        this.editToggle = !this.editToggle;
    }

}