import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../model/product';
import { TvsService } from '../../../services/tvs.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tvs-product-view',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, CommonModule],
  providers: [Router, Location, SnackbarService, TvsService],
  templateUrl: './tvs-product-view.component.html',
  styleUrl: './tvs-product-view.component.css'
})
export class TvsProductViewComponent implements OnInit, OnDestroy{
  productId: number = 0;
  tvsProduct: Product = new Product();
  unsubscribe: Subject<void> = new Subject<void>();
  feildEmpty: boolean = false;

  constructor(private _location: Location, private _router:Router, private _route:ActivatedRoute, private _tvsService:TvsService, private _snackbar:SnackbarService) {}
  
  ngOnInit(): void {
    this._route.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe((resp: any) => {
      if (resp) {
        this.productId = Number(resp.get('id'));
      }
    });
    this.getProduct(this.productId);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  goBack(event: Event): void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/tvs'])
    }
  }

  getProduct(id: number): any {
    if (id > 0) {
      this._tvsService.getProduct(id).pipe(takeUntil(this.unsubscribe)).subscribe((response: Product) => {
        if (response) {
          this.tvsProduct = response;
        }
      });
    } else {
      this.tvsProduct = new Product();
      this.tvsProduct.quantity = "";
      this.tvsProduct.qualityLevel = "";
      this.tvsProduct.sellingPrice = "";
      this.tvsProduct.purchasePrice = "";
    }
  }

  updateProduct(tvsProduct: Product): void {
    if (tvsProduct.productCode && tvsProduct.productName && tvsProduct.quantity && tvsProduct.qualityLevel && tvsProduct.sellingPrice && tvsProduct.purchasePrice) {
      this._tvsService.updateProduct(tvsProduct).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
        if (response) {
          this._snackbar.getSuccessMessage('Product updated successfully.');
          this._router.navigateByUrl('/tvs');
        } else {
          this._snackbar.getErrorMessage('Error in product update.');
        }
      })
    } else {
      this.feildEmpty = true;
      this._snackbar.getErrorMessage('Please fill the all required feilds.');
    }
    this.feildEmpty = false;
  }

  addProduct(tvsProduct: Product): void {
    if (tvsProduct.productCode && tvsProduct.productName && tvsProduct.quantity && tvsProduct.qualityLevel && tvsProduct.sellingPrice && tvsProduct.purchasePrice) {
      this._tvsService.addProduct(tvsProduct).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
        if (response) {
          this._snackbar.getSuccessMessage('Product added successfully.');
          this._router.navigateByUrl('/tvs');
        } else {
          this._snackbar.getErrorMessage('Error in product add.');
        }
      })
    } else {
      this.feildEmpty = true;
      this._snackbar.getErrorMessage('Please fill the all required feilds.');
    }
    this.feildEmpty = false;
  }
}
