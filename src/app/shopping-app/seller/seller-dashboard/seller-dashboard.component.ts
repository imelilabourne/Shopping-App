import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response,Headers } from '@angular/http';
import {ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

declare var $;
//declare const $;

//services
import {AuthService} from '../../services/auth.service'

//interface
import {Products} from '../model/Products'
//import {product} from '../model/product'
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  

  newProductForm:FormGroup;
  products: Products[];
  upproducts: Products[] = [];

  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';

  constructor(private router: Router,private route: ActivatedRoute, private dataservice: AuthService,private http: Http,private fb: FormBuilder) { }
   

  ngOnInit() {
    this.displayProductList();
    this. newProduct();

    this.dtOptions = {
      pagingType: 'full_numbers',
       pageLength: 5,
       lengthMenu : [5, 10, 25],
       processing: true
    };
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(); 

    //$(function () {
    //  $('#example').DataTable( {
     ////   dom: 'Bfrtip',
     //   buttons: [
      //      'copy', 'csv', 'excel', 'print'
     //   ]
  //  } );
 //   });

  }

  newProduct(){
    this.newProductForm = this.fb.group({
      ProductName : [null,[Validators.required]],
      ProductDeatils :[null,[Validators.required]],
      ProductPrice : [null,[Validators.required]],
      ProductQuantity :[null,[Validators.required]],
      Status : [null,[Validators.required]]
    });
  }

  exportexcel(): void{
    /* pass here the table id */
    let element = document.getElementById('dataTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

  get ProductName(){
    return this.newProductForm.get('ProductName') as FormControl;
  }
  get ProductDeatils(){
    return this.newProductForm.get('ProductDeatils') as FormControl;
  }
  get ProductPrice(){
    return this.newProductForm.get('ProductPrice') as FormControl;
  }
  get ProductQuantity(){
    return this.newProductForm.get('ProductQuantity') as FormControl;
  }
  get Status(){
    return this.newProductForm.get('Status') as FormControl;
  }

  displayProductList() {
    this.dataservice. getProductlist().subscribe(data =>
      {
        // as the Web Api doesn't sort the list of todos, we do here in the frontend
        this.upproducts = data.sort((a,b)=> {
          if (a.id>b.id) return -1;
          if (a.id<b.id) return 1;
        });
        console.log('display productList', this.upproducts);
      });
  }


  onSubmit(){
   // console.log(this.newProductForm.value);
    this.dataservice.createProduct(this.newProductForm.value)
    .subscribe(
      response => alert('Inserted Successful'),    
      error=> console.error('Error',error)
    )
    this.newProductForm.reset();
    this.router.navigate(['seller'])
    this.displayProductList();

    }


    onDelete(id: number){
      console.log('delete', id);    
      this.dataservice.deleteProduct(id).subscribe();
      this.displayProductList();
    }

    onEdit(prodId : number){
     
      this.router.navigate(['/updateproduct',prodId])
    }
}// End of Class

  

 