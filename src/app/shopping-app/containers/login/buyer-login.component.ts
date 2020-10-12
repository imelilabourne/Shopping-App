import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
    selector: `buyer-login`,
    styleUrls: [`buyer-login.component.css`],
    template:  `
    <div>
        <form [formGroup] = "form" (ngSubmit)="submit()">
            <p>Welcome to Shopoo</p>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Username" formControlName="user">
                <input type="password" class="form-control" placeholder="Password" formControlName="pass">
                <button class="btn btn-block" type="submit">Login</button> 
                <a routerLink="../shop">go back to homepage</a>
            </div>
        </form>
    </div>
    `
})

export class BuyerLoginComponent{
    constructor(private fb: FormBuilder, 
        private router: Router,
        private userService: UsersService){}

    form = this.fb.group({
        user: '',
        pass: ''
    })

    submit(){
        this.userService.getUsers()
            .subscribe((users) =>{
                users.map(item => {
                    if(this.form.get('user').value === item.username && this.form.get('pass').value === item.password){
                        this.router.navigateByUrl('/shop');
                        localStorage.setItem('user', this.form.get('user').value);
                    }
                })
            })
        // console.log(this.form.get('user').value, this.form.get('pass').value)
        // localStorage.setItem('user',this.form.get('user').value)
        // this.router.navigateByUrl('/shop');
    }
}