import { Product } from "./products.interface";

export class CartItem{
    id: number; 
    productName: string; 
    qty: number;
    price: number;  

    constructor(id: number, product: Product, qty=1){
        this.id = id; 
        this.productName = product.name; 
        this.qty = qty;
        this.price = product.price; 
    }
}