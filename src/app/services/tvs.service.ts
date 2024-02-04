import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class TvsService {
  url : string = environment.apiBaseUrl;

  constructor(private _httpClient: HttpClient) { }

  public getProductList(): Observable<any> {
    return this._httpClient.get(`${this.url}/api/Tvs/get-products-list`);
  }

  public getProduct(id: number): Observable<any> {
      return this._httpClient.get(`${this.url}/api/Tvs/get-product/${id}`);
  }

  public updateProduct(product: Product): Observable<any> {
      return this._httpClient.put(`${this.url}/api/Tvs/update-product`, product);
  }

  public addProduct(product: Product): Observable<any> {
      return this._httpClient.post(`${this.url}/api/Tvs/add-product`, product);
  }

  public deleteProduct(id: number): Observable<any> {
      return this._httpClient.delete(`${this.url}/api/Tvs/delete-product/${id}`);
  } 
}
