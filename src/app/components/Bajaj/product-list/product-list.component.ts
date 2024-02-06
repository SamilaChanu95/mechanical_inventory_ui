import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../model/product';
import { Subject, takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgForOf, CommonModule, NgIf, RouterOutlet],
  providers: [ProductService, Router, SnackbarService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy{
  productList: Product[] = [];
  unsubscribe: Subject<void> = new Subject<void>();
  constructor (private _productService: ProductService, private _router: Router, private _snackBarService:SnackbarService) {}

  ngOnInit(): void 
  {
    this.getProductList();
  }

  ngOnDestroy(): void 
  {
    this.unsubscribe.next();
    this.unsubscribe.complete();    
  }

  public open(event: Event, item: any): void {
    this._router.navigateByUrl(`/bajaj/${item.id}`);
  }

  addProduct(event: Event): void {
    this._router.navigateByUrl('/bajaj/0');
  }

  deleteItem(event: Event, item: Product): void {
    this._productService.deleteProduct(item.id).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
      if (response) {
        this._snackBarService.getSuccessMessage('Product deleted successfully.');
        this._router.navigateByUrl('/bajaj');
      } else {
        this._snackBarService.getErrorMessage('Error in product delete.');
      }
    });
  }

  getProductList(): void {
    this._productService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe((response : Product[]) => {
      this.productList = response;
    });
  }

  trackById(index: any, item: any) {
    return item.id;
  }
}
