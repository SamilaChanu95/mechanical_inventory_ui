import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { MahindraService } from '../../../services/mahindra.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../model/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-mahindra-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, SnackbarService, MahindraService],
  templateUrl: './mahindra-product-list.component.html',
  styleUrl: './mahindra-product-list.component.css'
})
export class MahindraProductListComponent implements OnInit, OnDestroy {
  productList: Product [] = [];  
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _router: Router, private _mahindraService: MahindraService, private _snackBarService: SnackbarService) {}
  
  ngOnInit(): void {
    this.getProductList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  
  getProductList(): void {
    this._mahindraService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe((res: Product[]) => {
      if (res) {
        this.productList = res;
      }
    });
  }

  deleteItem($event: MouseEvent, item: Product):void {
    this._mahindraService.deleteProduct(item.id).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
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
    this._router.navigateByUrl(`/mahindra/${item.id}`);
  }

  addProduct($event: MouseEvent): void {
    this._router.navigateByUrl(`/mahindra/0`);
  }

  trackById(item: any, index: any): number {
    return item.id;
  }
}
