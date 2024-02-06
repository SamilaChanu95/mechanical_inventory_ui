import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class KtmService {
  url: string = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  public getProductList(): Observable<any> {
    return this._http.get(`${this.url}/api/Ktm/get-product-list`);
  }

  public getProduct(id: number): Observable<any> {
      return this._http.get(`${this.url}/api/Ktm/get-product/${id}`);
  }

  public updateProduct(product: Product): Observable<any> {
      return this._http.put(`${this.url}/api/Ktm/update-product`, product);
  }

  public addProduct(product: Product): Observable<any> {
      return this._http.post(`${this.url}/api/Ktm/add-product`, product);
  }

  public deleteProduct(id: number): Observable<any> {
      return this._http.delete(`${this.url}/api/Ktm/delete-product/${id}`);
  }
}
