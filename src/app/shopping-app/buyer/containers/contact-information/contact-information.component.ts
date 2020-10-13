import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shopping-app/services/users.service';

@Component({
    selector: 'contact-information',
    styleUrls: ['contact-information.component.css'],
    template: `
    <div>
        <form [formGroup] = "infoForm" (ngSubmit) = "submitInfo()">
            <div class="form-group form">
                <input type="text" class="form-control" placeholder="First Name" formControlName="fname">
                <input type="text" class="form-control" placeholder="Last Name" formControlName="lname">
                <input type="text" class="form-control" placeholder="Home Address" formControlName="homeadd">
                <input type="text" class="form-control" placeholder="Email Address" formControlName="email">
                <input type="number" class="form-control" placeholder="Contact Number (09x-xxxx-xxxx)" formControlName="contact">
                <button [disabled]="infoForm.invalid" type="submit" class="btn btn-success btn-block">Proceed</button>
                <p>I have an account, <button class="loginBtn" routerLink="../login">Login</button></p>
               
            </div>
        </form>
    </div>
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
        this.userService.postUser({ username: 'guest', password: 'default', ...this.infoForm.value})
        .subscribe()
        localStorage.setItem('user', 'guest');
        this.router.navigateByUrl('success');
    }
}