import { Pipe, PipeTransform } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
import { Product } from '../model/products.interface';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any[], searchString: string, propName: string): any[]{
    const resultArray = [];
    if(products.length === 0 || searchString === "" || propName === ''){
      return products;
    }

    products.map(item => {


        if(item[propName].toLowerCase().match(searchString.toLowerCase())){
        resultArray.push(item);
        }

    })
    return resultArray;
  }

}
