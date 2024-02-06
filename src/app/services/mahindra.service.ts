import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class MahindraService {
  url: string = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  public getProductList(): Observable<any> {
    return this._http.get(`${this.url}/api/Mahindra/get-product-list`);
  }

  public getProduct(id: number): Observable<any> {
      return this._http.get(`${this.url}/api/Mahindra/get-product/${id}`);
  }

  public updateProduct(product: Product): Observable<any> {
      return this._http.put(`${this.url}/api/Mahindra/update-product`, product);
  }

  public addProduct(product: Product): Observable<any> {
      return this._http.post(`${this.url}/api/Mahindra/add-product`, product);
  }

  public deleteProduct(id: number): Observable<any> {
      return this._http.delete(`${this.url}/api/Mahindra/delete-product/${id}`);
  }
}
