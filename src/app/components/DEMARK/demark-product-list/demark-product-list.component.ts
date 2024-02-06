import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Product } from '../../../model/product';
import { DemarkService } from '../../../services/demark.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-demark-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, SnackbarService, DemarkService],
  templateUrl: './demark-product-list.component.html',
  styleUrl: './demark-product-list.component.css'
})

export class DemarkProductListComponent implements OnInit, OnDestroy {
  productList: Product [] = [];
  unsubscribe: Subject<void> = new Subject<void> ();

  constructor(private _router: Router, private _demark: DemarkService, private _snackBarService: SnackbarService) {}
  
  ngOnInit(): void {
    this.getProductList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  deleteItem($event: MouseEvent, item: Product): void {
    this._demark.deleteProduct(item.id).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
      if (response) 
      { 
        this._snackBarService.getSuccessMessage('Product deleted successfully.');
        this.getProductList();
      } else {
        this._snackBarService.getErrorMessage('Error in product delete.');
      }
    });
  }

  openItem($event: MouseEvent, item: Product): void {
    this._router.navigateByUrl(`/demark/${item.id}`);
  }

  addProduct($event: MouseEvent): void {
    this._router.navigateByUrl(`/demark/0`);
  }

  getProductList(): void {
    this._demark.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe((response: Product[]) => {
      if (response) {
        this.productList = response;
      }
    });
  }

  trackById(item: any, index: any): number {
    return item.id;
  }
}

