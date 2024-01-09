import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../model/product';
import { Subject, takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgForOf, NgForOfContext, NgIf, NgIfContext } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgForOf, CommonModule, NgIf],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy{
  productList: Product[] = [];
  unsubscribe: Subject<void> = new Subject<void>();
  constructor (private _productService: ProductService) {}

  ngOnInit() : void 
  {
    this.getProductList();
  }

  ngOnDestroy() : void 
  {
    this.unsubscribe.next();
    this.unsubscribe.complete();    
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
