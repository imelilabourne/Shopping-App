import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/products.interface';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'buyer-homepage',
    styleUrls: ['buyer-homepage.component.css'],
    template: `
    <div class="container">

        <div class="row" >
            <div class="col product" *ngFor="let product of products">
                <product-item [productItem]="product"></product-item>

            </div>
        </div>

        
    </div>
    `
})

export class BuyerHomepage{
    products: Product[] = [];
    constructor(private productService: ProductService){
    }
    ngOnInit(){
        this.productService.getProducts()
            .subscribe(data => this.products = data);

    }
    addCart(){
        console.log(this.productService.getProducts());
    }
}