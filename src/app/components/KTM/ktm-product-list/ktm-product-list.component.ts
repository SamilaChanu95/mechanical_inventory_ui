import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Product } from '../../../model/product';
import { KtmService } from '../../../services/ktm.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ktm-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, SnackbarService, KtmService],
  templateUrl: './ktm-product-list.component.html',
  styleUrl: './ktm-product-list.component.css'
})
export class KtmProductListComponent implements OnInit, OnDestroy{
  productList: Product[] = [];
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _router: Router, private _ktmService: KtmService, private _snackBarService: SnackbarService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  
  getProductList(): void {
    this._ktmService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe((response: Product[]) => {
      if (response) {
        this.productList = response;
      }
    });
  }

  openItem($event: MouseEvent, item: Product): void {
    this._router.navigateByUrl(`/ktm/${item.id}`);
  }

  deleteItem($event: MouseEvent, item: Product): void {
    this._ktmService.deleteProduct(item.id).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
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
    this._router.navigateByUrl(`/ktm/0`);
  }

  trackById(item: any, index: any): number {
    return item.id;
  }

}
