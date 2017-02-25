import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../model/Product';

@Injectable()
export class ProductService {
    constructor(private _http: Http) {}

    getProducts() {
        this._http.head("*");
        return this._http.get('http://localhost/api-rest/gitjoyy-api.php/products')
                            .map(res => res.json());
    }

    getProduct(id: string) {
        this._http.head("*");
        return this._http.get('http://localhost/api-rest/gitjoyy-api.php/products/' + id)
                            .map(res => res.json());
    }

    addProduct(product: Product) {
        let json = JSON.stringify(product);
        let params = "json=" + json;
        let headers = new Headers({"Content-type":"application/x-www-form-urlencoded"});

        return this._http.post('http://localhost/api-rest/gitjoyy-api.php/products', params, {headers: headers})
                            .map(res => res.json());
    }
}