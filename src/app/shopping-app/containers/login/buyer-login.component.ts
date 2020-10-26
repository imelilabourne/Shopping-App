import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
    selector: `buyer-login`,
    styleUrls: [`buyer-login.component.css`],
    template:  `
    <buyer-navbar></buyer-navbar>
    <div class="main">
        <form [formGroup] = "form" (ngSubmit)="submit()">
            <p>Welcome to Shopoo</p>

            <div class="alert alert-danger" *ngIf="errorMessage === true">
                Not Registered
            </div>
            <div class="form-group">
                <input required type="text" class="form-control" placeholder="Username" formControlName="user" [ngClass]="{'is-invalid': form.get('user').touched && form.get('user').invalid}">
                <div class="invalid-feedback" *ngIf="form.get('user').invalid && form.get('user').touched">
                Username is required
                </div>
                <input required type="password" class="form-control pass" placeholder="Password" formControlName="pass" [ngClass]="{'is-invalid': form.get('pass').touched && form.get('pass').invalid}">

                <div class="invalid-feedback" *ngIf="form.get('pass').invalid && form.get('pass').touched">
                Password is required
                </div>
                <button class="btn btn-block " type="submit">Login</button> 
                <a routerLink="../shop">go back to homepage</a>
            </div>
        </form>
    </div>
    <buyer-footer></buyer-footer>
    `
})

export class BuyerLoginComponent{

    errorMessage: boolean = false;
    constructor(private fb: FormBuilder, 
        private router: Router,
        private userService: UsersService){}

    form = this.fb.group({
        user: ['', Validators.required],
        pass: ['', Validators.required]
    })

    submit(){
        this.userService.getUsers()
            .subscribe((users) =>{
                users.map(item => {
                    if(this.form.get('user').value === item.username && this.form.get('pass').value === item.password && item.role === "buyer"){
                        this.router.navigateByUrl('/shop');
                        localStorage.setItem('user', this.form.get('user').value);
                    }else if(this.form.get('user').value === item.username && this.form.get('pass').value === item.password  && item.role === "seller"){
                        this.router.navigateByUrl('/seller');
                        localStorage.setItem('user', this.form.get('user').value);
                    }
                    else{
                        this.errorMessage = true;
                    }
                })
            })
        // console.log(this.form.get('user').value, this.form.get('pass').value)
        // localStorage.setItem('user',this.form.get('user').value)
        // this.router.navigateByUrl('/shop');
    }
}