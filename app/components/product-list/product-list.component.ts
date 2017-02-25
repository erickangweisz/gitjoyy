import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/Product';

@Component({
  selector: 'product-list',
  templateUrl: './app/components/product-list/product-list.template.html',
  providers: [ ProductService ]
})

export class ProductListComponent implements OnInit {
  public title:string = "Product List:";
  public products: Product[];
  public status:string;
  public errorMessage:any;

  constructor(private _productService: ProductService) {}

  ngOnInit() { 
      this.getProducts(); 
  }

  getProducts() {
      this._productService.getProducts()
                            .subscribe(
                                result => {
                                    this.products = result.data; 
                                    this.status = result.status;
                                    console.log('product-list success');

                                    if (this.status !== "success") {
                                        alert("server error");
                                    }
                                }, 
                                error => {
                                    this.errorMessage = <any>error;
                                    if (this.errorMessage !== null) {
                                        console.log(this.errorMessage);
                                        alert("request error");
                                    }
                                });
  }

};