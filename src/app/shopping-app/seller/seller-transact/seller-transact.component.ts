import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response,Headers } from '@angular/http';
import {ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';


//services
import {CartService} from '../../services/cart.service';
import {TransactService} from '../../services/transac.service';
import {ProductService} from '../../services/product.service';
//interface
import {Product} from '../../model/products.interface'
import {CartItem } from '../../model/cart-item.interface'
import { DomSanitizer } from '@angular/platform-browser';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-transact',
  templateUrl: './seller-transact.component.html',
  styleUrls: ['./seller-transact.component.css']
})
export class SellerTransactComponent implements OnInit {
  @ViewChild('dataTable') table: ElementRef;
  nativeElement: any;
  @ViewChild('File') InputFile;
  UploadFile: File;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  searchProduct = "";

  newProductForm:FormGroup;
  products: Product[];
  upproducts: Product[] = [];
  upcart : CartItem[] = [];
  selectedfile: File = null;
 
  user = localStorage.getItem('user');

  fileName= 'Sales_Export.xlsx';
  url: string | ArrayBuffer;
  selectedFile : File = null;
  Seller1String:string="Apple";
  //Seller2String:string="5E Cakes";
  isSeller1 : boolean = false;
  isSeller2 : boolean = false;
  finalOrder: CartItem[] = [];
  

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataservice: TransactService,
    private cartservice : CartService,
    private http: Http,
    private fb: FormBuilder,
    private _sanitizer: DomSanitizer,
    private productService :ProductService) { }

  ngOnInit() {
    this.displayProductList();
  
  }
  displayProductList() {
    this.dataservice.getHistory().subscribe(data =>
      {
        data.map(item => {
           this.finalOrder.push(item.transac)
        })
        // as the Web Api doesn't sort the list of todos, we do here in the frontend
        // this.finalOrder = data.sort((a,b)=> {
        //   if (a.id>b.id) return -1;
        //   if (a.id<b.id) return 1;
        // });
        // console.log('Transaction', this.finalOrder);
        this.isSeller1 = true;
      });

    //this.productService.getProductlist().subscribe(data => this.upproducts = data);  
    // console.log('display Transaction', this.finalOrder);
    this.isSeller1=true;
    
  }
 

  onExportExcel(): void{
    /* pass here the table id */
    let element = document.getElementById('dataTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    //delete (ws['5'])
   // ws['!cols'] = [];
   // ws['!cols'][5] = { hidden: true };
   // ws['!cols'][1] = { hidden: true };
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
  }

}
