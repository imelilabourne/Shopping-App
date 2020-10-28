import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response,Headers } from '@angular/http';
import {ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

declare var $:any;
//declare const $;

//services

import {ProductService} from '../../services/product.service';
//interface
import {Product} from '../../model/products.interface'
import { DomSanitizer } from '@angular/platform-browser';
//import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
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

  selectedfile: File = null;
 
  user = localStorage.getItem('user');


  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';
  url: string | ArrayBuffer;
  selectedFile : File = null;
  Seller1String:string="Apple";
  Seller2String:string="5E Cakes";
  isSeller1 : boolean = false;
  isSeller2 : boolean = false;
  itemAdded: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataservice: ProductService,
              private http: Http,
              private fb: FormBuilder,
              private _sanitizer: DomSanitizer) { }
   

  ngOnInit() {
    this.displayProductList();
    this.newProduct();

   // this.dtOptions = {
   //   pagingType: 'full_numbers',
    //   pageLength: 5,
   //    lengthMenu : [5, 10, 25],
   //    processing: true
   // };
   // this.dataTable = $(this.table.nativeElement);
    //this.dataTable.DataTable(); 

    $(() => {
      $('.dropify').dropify();
    });

    //$(function () {
    //  $('#example').DataTable( {
     ////   dom: 'Bfrtip',
     //   buttons: [
      //      'copy', 'csv', 'excel', 'print'
     //   ]
  //  } );
 //   });

  }
  itemMsg(){
     this.itemAdded = false;
            }
  newProduct(){
    this.newProductForm = this.fb.group({
      name : [null,[Validators.required]],
      description :[null,[Validators.required]],
      price : [null,[Validators.required]],
      stocks :[null,[Validators.required]],
      imageUrl :[null,[Validators.required]]
    });
  }


  get name(){
    return this.newProductForm.get('name') as FormControl;
  }
  get description(){
    return this.newProductForm.get('description') as FormControl;
  }
  get price(){
    return this.newProductForm.get('price') as FormControl;
  }
  get stocks(){
    return this.newProductForm.get('stocks') as FormControl;
  }
  get imageUrl(){
    return this.newProductForm.get('imageUrl') as FormControl;
  }
  

  displayProductList() {
  //  if (this.user === "admin1"){
    this.dataservice.getProductlist().subscribe(data =>
      {
        // as the Web Api doesn't sort the list of todos, we do here in the frontend
        this.upproducts = data.sort((a,b)=> {
          if (a.id>b.id) return -1;
          if (a.id<b.id) return 1;
        });
        console.log('display productList1', this.upproducts);
        this.isSeller1 = true;
      });
  //  }else if (this.user === "admin2"){
    //  this.dataservice.getProductlist2().subscribe(data =>
      //  {
          // as the Web Api doesn't sort the list of todos, we do here in the frontend
       //   this.upproducts = data.sort((a,b)=> {
       //     if (a.id>b.id) return -1;
       //     if (a.id<b.id) return 1;
      //    });
      //    console.log('display productList2', this.upproducts);
      //    this.isSeller2 = true;
      //  });
    //}
  }

  
 
  onSelectFile(event) { // called each time file input changes

    console.log(event.target.files[0].name);

    this.selectedfile = <File>event.target.files[0];

    // console.log(this.selectedfile)
    // if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // console.log(event.target.files, event.target.files[0])
      reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
              this.url = reader.result; 
            };
       
      // }
    }
//readUrl(event:any) {
 // if (event.target.files && event.target.files[0]) {
  //  var reader = new FileReader();
   // reader.onload = (event: ProgressEvent) => {
   //   this.url = (<FileReader>event.target).result;
   // }
  //  reader.readAsDataURL(event.target.files[0]);
 // }
//}

  onSubmit(){
    if (this.user === "admin1"){
    this.dataservice.createProduct({
      ...this.newProductForm.value, 
      //productId:`${this.id}`,
      imageUrl : `../../../../assets/${this.selectedfile.name}`
    })
    .subscribe(
       response => alert('Inserted Successful'),    
      error=> console.error('Error',error)
    )
    this.newProductForm.reset()
    this.router.navigate(['seller'])
    this.displayProductList()
    // console.log("url",this.url);
    }else if (this.user === "admin2"){
      this.dataservice.createProduct2({
        ...this.newProductForm.value, 
        imageUrl : `../../../../assets/${this.selectedfile.name}`
      })
      .subscribe(
         response => alert('Inserted Successful'),    
        error=> console.error('Error',error)
      )
      this.newProductForm.reset();
      this.router.navigate(['seller'])
      this.displayProductList();

    }
    this.displayProductList()
    }

    onExportExcel(): void{
      /* pass here the table id */
      let element = document.getElementById('dataTable');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      //delete (ws['5'])
      ws['!cols'] = [];
      ws['!cols'][5] = { hidden: true };
      ws['!cols'][1] = { hidden: true };
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   
      /* save to file */  
      XLSX.writeFile(wb, this.fileName);
    }
  

    onDelete(id: number){
    //  if (this.user === "admin1"){
      console.log('delete', id);    
      this.dataservice.deleteProduct(id).subscribe();
     
      this.itemAdded =true;
      this.displayProductList();
  // }else if (this.user === "admin2"){
    //  console.log('delete2', id);    
    //  this.dataservice.deleteProduct2(id).subscribe();
    //  this.displayProductList();
   // }
    }

    onEdit(prodId : number){
     
      this.router.navigate(['/updateproduct',prodId])
    }
   
}// End of Class

  

 