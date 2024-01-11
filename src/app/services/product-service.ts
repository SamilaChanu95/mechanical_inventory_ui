import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    url: string = environment.apiBaseUrl;

    constructor(private _http:HttpClient) {
    }

    public getProductList(): Observable<any> {
        return this._http.get(`${this.url}/api/BajajProduct/get-products-list`);
    }

    public getProduct(id: number): Observable<any> {
        return this._http.get(`${this.url}/api/BajajProduct/get-product/${id}`);
    }
}