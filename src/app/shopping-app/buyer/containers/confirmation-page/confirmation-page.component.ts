import { Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartItem } from 'src/app/shopping-app/model/cart-item.interface';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { User } from 'src/app/shopping-app/model/user.interface';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { HistoryService } from 'src/app/shopping-app/services/history.service';
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
            <a (click)="reset()" routerLink="/shop">Back to Shop</a><span>&#10095;</span>
            <a (click)="reset()" routerLink="/cart">Shopping Bag</a><span>&#10095;</span>
            <p style="color: green">Checkout</p>
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
                            <form [formGroup] = "shipForm" (ngSubmit)="onSubmit(shipForm.value)" >
                                <input type="text" class="control" placeholder="First Name" [value]="user.fname" formControlName="fname">
                                <input type="text" class="control" placeholder="Last Name" [value]="user.lname" formControlName="lname">
                                <input type="text" class="control" placeholder="Home Address" [value] = "user.homeadd" formControlName = "homeadd">
                                <input type="email" class="control" placeholder="Email Address" [value] = "user.email" formControlName = "email">
                                <input type="number" class="control" placeholder="Contact Information" [value] = "user.contact" formControlName = "contact">
                                <button type="submit" class="btn btn-info">Submit</button>
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
            <hr>
            <br>
            <div class="container">
                <div class="row ship">
                  <p>Sub Total</p>
                  <p>{{ subtotal | currency: 'Php ' }}</p>
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
                    <p>{{ subtotal + 150 |  currency: 'Php ' }}</p>
                </div>
            </div>
 
            <button (click)="showMsg()" class="button btn-block text">Add Voucher</button>
            <button (click)="modal(); checkoutreset()" class="button btn-block" type="button" data-toggle="modal" data-target="#exampleModal">Check out</button>

            <small *ngIf="showMessage">No voucher available for this item</small>

            </div>
        </div>

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
    subtotal: number = 0;
    user: User;
    infoForm;
    cartItems: CartItem[] =[];
    products:Product[] = [];
    finalOrder: CartItem[] = [];
    name: string;
    beforeEditing: string;
    beforeEditinglname: string;
    beforeEditinghomeadd: string;
    beforeEditingemail: string;
    beforeEditingcontact: number;
    constructor(private userService: UsersService, 
                private transac: TransactService, 
                private cartService:CartService, 
                private productService: ProductService, 
                private fb: FormBuilder,
                private historyService: HistoryService
    ){}

    shipForm = this.fb.group({
        fname : '',
        lname : '',
        homeadd : '',
        email : '',
        contact :''
    })

    ngOnInit(){
        this.beforeEditing = '';
        this.beforeEditinglname = '';
        this.beforeEditingemail = '';
        this.beforeEditinghomeadd = '';

        this.userService.getUsers().subscribe(data => {
            data.map(user => {
                if(user.username === localStorage.getItem('user')){
                    this.user = user;
                }
            });
        })
        this.transac.getTransac().subscribe(res => {
          res.map(resp => {this.finalOrder = resp
            this.subTotal();
            });
        });
        this.productService.getProductlist().subscribe(data => this.products = data);   
    }

    onSubmit(){
        this.beforeEditing = this.user.fname;
        this.beforeEditinglname = this.user.lname;
        this.beforeEditinghomeadd = this.user.homeadd;
        this.beforeEditingemail = this.user.email;
        this.beforeEditingcontact = this.user.contact;

        this.infoForm = Object.assign({}, this.shipForm.value, this.shipForm.value)

        this.user.fname =  this.infoForm.fname;
        this.user.lname =  this.infoForm.lname;
        this.user.homeadd = this.infoForm.homeadd;
        this.user.email =  this.infoForm.email;
        this.user.contact = this.infoForm.contact;
        
        if(this.infoForm.fname.trim().length === 0){
            this.user.fname = this.beforeEditing;
        }
        if(this.infoForm.lname.trim().length === 0){
            this.user.lname = this.beforeEditinglname;
        }
        if(this.infoForm.homeadd.trim().length === 0){
            this.user.homeadd = this.beforeEditinghomeadd;
        }
        if(this.infoForm.email.trim().length === 0){
            this.user.email = this.beforeEditingemail;
        }
        if(this.infoForm.contact.trim().length === 0){
            this.user.contact = this.beforeEditingcontact;
        }

        this.editToggle = false;
    }
    
    
    

    modal(){
        this.modalToggle = !this.modalToggle;
       
    }

    subTotal(){
   
        this.finalOrder.map(cart => {
           
                this.subtotal += cart.price * cart.qty;
            
        })
    
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


                        // this.cartService.removeProduct(order).subscribe();
                        // this.cartService.getCartItems().subscribe(carts => {
                        //     carts.map(cart => {
                        //         if(cart.qty >= product.stocks){
                        //             this.cartService.removeProduct(cart).subscribe();
                        //         }
                        //     })
                        // })
                        this.historyService.postHistory(order).subscribe();
                    }
                })
            })
        });

        this.reset();

            
    }

    reset(){
        this.transac.resetTransac().subscribe();
        
    }

    showMsg(){
        this.showMessage = true;
    }

    editToggler(){
        this.editToggle = !this.editToggle
    }

}