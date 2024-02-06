import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class HondaService {
  url: string = environment.apiBaseUrl;

  constructor(private _httpClient:HttpClient) { }

  public getProductList(): Observable<any> {
    return this._httpClient.get(`${this.url}/api/Honda/get-products-list`);
  }

  public getProduct(id: number): Observable<any> {
      return this._httpClient.get(`${this.url}/api/Honda/get-product/${id}`);
  }

  public updateProduct(product: Product): Observable<any> {
      return this._httpClient.put(`${this.url}/api/Honda/update-product`, product);
  }

  public addProduct(product: Product): Observable<any> {
      return this._httpClient.post(`${this.url}/api/Honda/add-product`, product);
  }

  public deleteProduct(id: number): Observable<any> {
      return this._httpClient.delete(`${this.url}/api/Honda/delete-product/${id}`);
  } 
}
