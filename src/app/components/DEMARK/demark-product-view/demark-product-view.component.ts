import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { SnackbarService } from '../../../services/snackbar.service';
import { DemarkService } from '../../../services/demark.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-demark-product-view',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  providers: [SnackbarService, DemarkService, Location, Router],
  templateUrl: './demark-product-view.component.html',
  styleUrl: './demark-product-view.component.css'
})
export class DemarkProductViewComponent implements OnInit, OnDestroy{
  demarkProduct: Product = new Product();
  productId: number = 0;
  unsubscribe: Subject<void> = new Subject<void> ();
  feildEmpty: boolean = false;

  constructor(private _snackBarService: SnackbarService, private _demarkService:DemarkService, private _route: ActivatedRoute, private _router: Router, private _location: Location) {}

  ngOnInit(): void {
    this._route.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe((response: any) => {
      if (response) {
        this.productId = Number(response.get('id'));
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
      this._demarkService.addProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((res: boolean) => {
        if (res) {
          this._snackBarService.getSuccessMessage('Product added successfully.');
          this._router.navigateByUrl('/demark');
        } else {
          this._snackBarService.getErrorMessage('Error in product add.');
        }
      });
    } else {
      this.feildEmpty = true;
      this._snackBarService.getErrorMessage('Please fill the all required feilds.');
    }
    this.feildEmpty = false;
  }

  updateProduct(item: Product): void {
    if (item.productCode && item.productName && item.quantity && item.qualityLevel && item.sellingPrice && item.purchasePrice) {
      this._demarkService.updateProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
        if (response) {
          this._snackBarService.getSuccessMessage('Product updated successfully.');
          this._router.navigateByUrl('/demark');
        } else {
          this._snackBarService.getErrorMessage('Error in product update.');
        }
      });
    } else {
      this.feildEmpty = true;
      this._snackBarService.getErrorMessage('Please fill the all required feilds.');
    }
    this.feildEmpty = false;
  }

  getProduct(id: number): void {
    if (id > 0) {
      this._demarkService.getProduct(id).pipe(takeUntil(this.unsubscribe)).subscribe((res: Product) => {
        if (res) {
          this.demarkProduct = res;
        }
      });
    } else {
      this.demarkProduct = new Product();
      this.demarkProduct.quantity = '';
      this.demarkProduct.qualityLevel = '';
      this.demarkProduct.sellingPrice = '';
      this.demarkProduct.purchasePrice = '';
    }
  }

  goBack(event: Event) : void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/demark'])
    }
  }

}
