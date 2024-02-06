import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YamahaService {
  url: string = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  public getProductList(): Observable<any> {
    return this._http.get(`${this.url}/api/Yamaha/get-products-list`);
  }

  public getProduct(id: number): Observable<any> {
      return this._http.get(`${this.url}/api/Yamaha/get-product/${id}`);
  }

  public updateProduct(product: Product): Observable<any> {
      return this._http.put(`${this.url}/api/Yamaha/update-product`, product);
  }

  public addProduct(product: Product): Observable<any> {
      return this._http.post(`${this.url}/api/Yamaha/add-product`, product);
  }

  public deleteProduct(id: number): Observable<any> {
      return this._http.delete(`${this.url}/api/Yamaha/delete-product/${id}`);
  }
}
