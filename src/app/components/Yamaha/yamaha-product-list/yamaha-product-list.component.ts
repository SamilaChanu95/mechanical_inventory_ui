import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { YamahaService } from '../../../services/yamaha.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../model/product';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-yamaha-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, YamahaService, SnackbarService],
  templateUrl: './yamaha-product-list.component.html',
  styleUrl: './yamaha-product-list.component.css'
})
export class YamahaProductListComponent implements OnInit, OnDestroy{
  productList: Product [] = [];
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _router: Router, private _snackBarService: SnackbarService, private _yamahaService: YamahaService) {}
  
  ngOnInit(): void {
    this.getProductList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getProductList(): void {
    this._yamahaService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe((response: Product []) => {
      if (response) {
        this.productList = response;
      }
    });
  }

  openItem($event: MouseEvent, item: Product): void {
    this._router.navigateByUrl(`/yamaha/${item.id}`);
  }

  deleteItem($event: MouseEvent, item: Product): void {
    this._yamahaService.deleteProduct(item.id).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
      if (response) 
      { 
        this._snackBarService.getSuccessMessage('Product deleted successfully.');
        this.getProductList();
      } else {
        this._snackBarService.getErrorMessage('Error in product delete.');
      }
    }); 
  }

  addProduct($event: MouseEvent): void {
    this._router.navigateByUrl(`/yamaha/0`);
  }

  trackById(index: any, item: any): number {
    return item.id;
  }
}
