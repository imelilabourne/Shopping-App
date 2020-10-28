import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shopping-app/services/users.service';

@Component({
    selector: 'contact-information',
    styleUrls: ['contact-information.component.css'],
    template: `
    <buyer-navbar></buyer-navbar>
    <div class="main">
        <form [formGroup] = "infoForm" (ngSubmit) = "submitInfo()">
            <div class="form-group form">
                <input type="text" class="form-control" placeholder="First Name" formControlName="fname" [ngClass]="{'is-invalid': infoForm.get('fname').touched && infoForm.get('fname').invalid}">
                <small class="invalid-feedback" *ngIf="infoForm.get('fname').invalid && infoForm.get('fname').touched">
                Firstname is required</small>
                
                <input type="text" class="form-control" placeholder="Last Name" formControlName="lname" [ngClass]="{'is-invalid': infoForm.get('lname').touched && infoForm.get('lname').invalid}">
                <small class="invalid-feedback" *ngIf="infoForm.get('lname').invalid && infoForm.get('lname').touched">
                Lastname is required</small>
                
                <input type="text" class="form-control" placeholder="Home Address" formControlName="homeadd" [ngClass]="{'is-invalid': infoForm.get('homeadd').touched && infoForm.get('homeadd').invalid}">
                <small class="invalid-feedback" *ngIf="infoForm.get('homeadd').invalid && infoForm.get('homeadd').touched">
                Home Address is required</small>

                <input type="text" class="form-control" placeholder="Email Address" formControlName="email" [ngClass]="{'is-invalid': infoForm.get('email').touched && infoForm.get('email').invalid}">
                <small class="invalid-feedback" *ngIf="infoForm.get('email').invalid && infoForm.get('email').touched">
                Email Address is required</small>

                <input type="number" class="form-control" placeholder="Contact Number (09x-xxxx-xxxx)" formControlName="contact" [ngClass]="{'is-invalid': infoForm.get('contact').touched && infoForm.get('contact').invalid}">
                <small class="invalid-feedback" *ngIf="infoForm.get('contact').invalid && infoForm.get('contact').touched">
                Contact Number is required</small>

                <button [disabled]="infoForm.invalid" type="submit" class="btn btn-success btn-block">Proceed</button>
                <p>I have an account, <button class="loginBtn" routerLink="../login">Login</button></p>
               
            </div>
        </form>
    </div>
    <buyer-footer></buyer-footer>
    `
})

export class ContactInformationComponent{
    constructor(private fb: FormBuilder, private userService: UsersService, private router: Router){
    }
    
    infoForm = this.fb.group({
        fname: ["", Validators.required],
        lname: ["", Validators.required],
        homeadd: ["", Validators.required],
        email: ["", Validators.required],
        contact: ["", [Validators.minLength(11), Validators.required]] 
    })

    submitInfo(){
        this.userService.postUser({ username: 'guest', password: 'default', role:'guest', ...this.infoForm.value})
        .subscribe()
        localStorage.setItem('user', 'guest');
        this.router.navigateByUrl('shop');
    }
}