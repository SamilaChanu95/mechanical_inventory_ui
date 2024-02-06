import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Product } from '../../../model/product';
import { HondaService } from '../../../services/honda.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-honda-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, HondaService, SnackbarService],
  templateUrl: './honda-product-list.component.html',
  styleUrl: './honda-product-list.component.css'
})
export class HondaProductListComponent implements OnInit, OnDestroy {
  productList: Product [] = [];
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _router: Router, private _hondaService:HondaService, private _snackbarService:SnackbarService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getProductList(): void {
    this._hondaService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe((resp: Product[]) => {
      if (resp) {
        this.productList = resp;
      }
    });
  }

  addProduct(event : MouseEvent): void {
    this._router.navigateByUrl('/honda/0');
  }

  openItem(event: MouseEvent, item: Product): void {
    this._router.navigateByUrl(`/honda/${item.id}`);
  }

  deleteItem(event: MouseEvent, item: Product): void {
    this._hondaService.deleteProduct(item.id).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
      if (response) {
        this._snackbarService.getSuccessMessage('Product deleted successfully.');
        this.getProductList();
      } else {
        this._snackbarService.getErrorMessage('Error in product delete.');
      }
    });
  }

  trackById(item: any, index: any): number {
    return item.id;
  }

}
