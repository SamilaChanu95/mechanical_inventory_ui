import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Product } from '../../../model/product';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TvsService } from '../../../services/tvs.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tvs-product-list',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, CommonModule],
  providers: [Router, TvsService, SnackbarService],
  templateUrl: './tvs-product-list.component.html',
  styleUrl: './tvs-product-list.component.css'
})
export class TvsProductListComponent implements OnInit, OnDestroy{
  productList: Product [] = [];
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _router: Router, private _tvsService:TvsService, private _snackbarService:SnackbarService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  addProduct(event : Event): void {
    this._router.navigateByUrl('/tvs/0');
  }

  getProductList(): void {
    this._tvsService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe((resp: Product[]) => {
      if (resp) {
        this.productList = resp;
      }
    });
  }

  openItem(event: Event, item: Product): void {
    this._router.navigateByUrl(`/tvs/${item.id}`);
  }

  deleteItem(event: Event, item: Product): void {
    this._tvsService.deleteProduct(item.id).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
      if (response) {
        this._snackbarService.getSuccessMessage('Product deleted successfully.');
        this.getProductList();
      } else {
        this._snackbarService.getErrorMessage('Error in product delete.');
      }
    });
  }

  trackById(index:any, item: any): number {
    return item.id;
  }
}
