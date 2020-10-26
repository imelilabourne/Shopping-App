import { Product } from "./products.interface";

export class CartItem{
    id: number; 
    productName: string; 
    qty: number;
    price: number;  
    customerName: string;
    photo: string;
    desc: string;

    constructor(id: number, product: Product,customerName: string, qty:number ){
        this.id = id; 
        this.productName = product.name; 
        this.qty = qty;
        this.price = product.price; 
        this.customerName = customerName;
        this.photo = product.imageUrl;
        this.desc = product.description;
    }
}