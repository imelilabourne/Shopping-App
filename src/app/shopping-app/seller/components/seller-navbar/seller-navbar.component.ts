import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-navbar',
  templateUrl: './seller-navbar.component.html',
  styleUrls: ['./seller-navbar.component.css']
})
export class SellerNavbarComponent implements OnInit {

  constructor(private router: Router){}


  user = localStorage.getItem('user');

  
  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.user = null;
    this.router.navigateByUrl('shop')
}
}
