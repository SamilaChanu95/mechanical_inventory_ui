import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { HeroService } from '../../../services/hero.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hero-product-view',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  providers: [Router, SnackbarService, Location, HeroService],
  templateUrl: './hero-product-view.component.html',
  styleUrl: './hero-product-view.component.css'
})
export class HeroProductViewComponent implements OnInit, OnDestroy {
  productId: number = 0;
  heroProduct: Product = new Product();
  unsubscribe: Subject<void> = new Subject<void>();
  feildEmpty: boolean = false;

  constructor(private _heroService: HeroService, private _snackbarService: SnackbarService, private _location: Location, private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      if (res) {
        this.productId = Number(res.get('id'));
      }
    });
    this.getProduct(this.productId);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  addProduct(item: Product): void {
    if (item.productCode && item.productName && item.quantity && item.qualityLevel && item.sellingPrice && item.purchasePrice) {
      this._heroService.addProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((res: boolean) => {
        if (res) {
          this._snackbarService.getSuccessMessage('Product added successfully.');
          this._router.navigateByUrl('/hero');
        } else {
          this._snackbarService.getErrorMessage('Error in product add.');
        }
      });
    } else {
      this.feildEmpty = true;
      this._snackbarService.getErrorMessage('Please fill the all required feilds.');
    }
    this.feildEmpty = false;
  }

  updateProduct(item: Product): void {
    if (item.productCode && item.productName && item.quantity && item.qualityLevel && item.sellingPrice && item.purchasePrice) {
      this._heroService.updateProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
        if (response) {
          this._snackbarService.getSuccessMessage('Product updated successfully.');
          this._router.navigateByUrl('/hero');
        } else {
          this._snackbarService.getErrorMessage('Error in product update.');
        }
      });
    } else {
      this.feildEmpty = true;
      this._snackbarService.getErrorMessage('Please fill the all required feilds.');
    }
    this.feildEmpty = false;
  }

  getProduct(id: number): void {
    if (id > 0) {
      this._heroService.getProduct(id).pipe(takeUntil(this.unsubscribe)).subscribe((res: Product) => {
        if (res) {
          this.heroProduct = res;
        }
      });
    } else {
      this.heroProduct = new Product();
      this.heroProduct.quantity = '';
      this.heroProduct.qualityLevel = '';
      this.heroProduct.sellingPrice = '';
      this.heroProduct.purchasePrice = '';
    }
  }

  goBack(event: Event) : void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/hero'])
    }
  }
}
