import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { HeroService } from '../../../services/hero.service';
import { Product } from '../../../model/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hero-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, SnackbarService, HeroService],
  templateUrl: './hero-product-list.component.html',
  styleUrl: './hero-product-list.component.css'
})
export class HeroProductListComponent implements OnInit, OnDestroy {
  productList: Product [] = [];
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _router: Router, private _heroService: HeroService, private _snackBarService: SnackbarService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  openItem($event: MouseEvent, item: Product): void {
    this._router.navigateByUrl(`/hero/${item.id}`);
  }

  deleteItem($event: MouseEvent, item: Product): void {
    this._heroService.deleteProduct(item.id).pipe(takeUntil(this.unsubscribe)).subscribe((res: boolean) => {
      if (res) 
      {
        this._snackBarService.getSuccessMessage('Product deleted successfully.');
        this.getProductList();
      } else {
        this._snackBarService.getErrorMessage('Error in product delete.');
      }
    });
  }

  addProduct($event: MouseEvent): void {
    this._router.navigateByUrl(`/hero/0`);
  }

  getProductList(): void {
    this._heroService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe((response: Product[]) => {
      if (response) 
      {
        this.productList = response;
      }
    });
  }

  trackById(item: any, index: any): number {
    return item.id;
  }
}
