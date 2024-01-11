import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../model/product';
import { Subject, takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgForOf, CommonModule, NgIf],
  providers: [ProductService, Router],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy{
  productList: Product[] = [];
  unsubscribe: Subject<void> = new Subject<void>();
  constructor (private _productService: ProductService, private _router: Router) {}

  ngOnInit() : void 
  {
    this.getProductList();
  }

  ngOnDestroy() : void 
  {
    this.unsubscribe.next();
    this.unsubscribe.complete();    
  }

  public open(event : Event, item: any): void {
    console.log("function called :", item);
    this._router.navigateByUrl(`/bajaj/${item.id}`);
  }

  addProduct(event : Event) : void {
    this._router.navigateByUrl('bajaj/0');
  }

  getProductList(): void {
    this._productService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe((response : Product[]) => {
      this.productList = response;
      console.log('productList:', this.productList);
    });
  }

  trackById(index: any, item: any) {
    return item.id;
  }
}
