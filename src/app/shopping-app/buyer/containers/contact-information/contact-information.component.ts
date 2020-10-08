import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'contact-information',
    styleUrls: ['contact-information.component.css'],
    template: `
    <div>
        <form [formGroup] = "infoForm">
            <div class="form-group form">
                <input type="text" class="form-control" placeholder="First Name" formControlName="fname">
                <input type="text" class="form-control" placeholder="Last Name" formControlName="lname">
                <input type="text" class="form-control" placeholder="Home Address" formControlName="homeadd">
                <input type="text" class="form-control" placeholder="Email Address" formControlName="email">
                <input type="number" class="form-control" placeholder="Contact Number" formControlName="contact">
                <button type="submit" class="btn btn-success btn-block" routerLink="../cart">Proceed</button>
                <p>I have an account, <button class="loginBtn" routerLink="../login">Login</button></p>
               
            </div>
        </form>
    </div>
    `
})

export class ContactInformationComponent{
    constructor(private fb: FormBuilder){
    }

    infoForm = this.fb.group({
        fname: "",
        lname: "",
        homeadd: "",
        email: "",
        contact: "" 
    })
}