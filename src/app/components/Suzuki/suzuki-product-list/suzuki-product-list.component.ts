import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Product } from '../../../model/product';
import { SuzukiService } from '../../../services/suzuki.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-suzuki-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, SnackbarService, SuzukiService],
  templateUrl: './suzuki-product-list.component.html',
  styleUrl: './suzuki-product-list.component.css'
})
export class SuzukiProductListComponent implements OnInit, OnDestroy {
  productList: Product [] = [];  
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _router: Router, private _suzukiService: SuzukiService, private _snackBarService: SnackbarService) {}
  
  ngOnInit(): void {
    this.getProductList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getProductList(): void {
    this._suzukiService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe((res: Product[]) => {
      if (res) {
        this.productList = res;
      }
    });
  }

  deleteItem($event: MouseEvent, item: Product): void {
    this._suzukiService.deleteProduct(item.id).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
      if (response) { 
        this._snackBarService.getSuccessMessage('Product deleted successfully.');
        this.getProductList();
      } else {
        this._snackBarService.getErrorMessage('Error in product delete.');
      }
    }); 
  }

  openItem($event: MouseEvent, item: Product): void {
    this._router.navigateByUrl(`/suzuki/${item.id}`);
  }

  addProduct($event: MouseEvent): void {
    this._router.navigateByUrl(`/suzuki/0`);
  }

  trackById(item: any, index: any): number {
    return item.id;
  }
}
