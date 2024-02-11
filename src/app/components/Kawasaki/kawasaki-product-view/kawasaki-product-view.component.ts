import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { KawasakiService } from '../../../services/kawasaki.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-kawasaki-product-view',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule],
  providers: [KawasakiService, SnackbarService, Location, Router],
  templateUrl: './kawasaki-product-view.component.html',
  styleUrl: './kawasaki-product-view.component.css'
})
export class KawasakiProductViewComponent implements OnInit, OnDestroy{
  productId: number = 0;
  kawasakiProduct: Product = new Product();
  unsubscribe: Subject<void> = new Subject<void>();
  feildEmpty: boolean = false;

  constructor(private _kawasakiService: KawasakiService, private _snackbarService:SnackbarService, private _route:ActivatedRoute, private _location:Location, private _router: Router) {}

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
      this._kawasakiService.addProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((res: boolean) => {
        if (res) {
          this._snackbarService.getSuccessMessage('Product added successfully.');
          this._router.navigateByUrl('/kawasaki');
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
      this._kawasakiService.updateProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
        if (response) {
          this._snackbarService.getSuccessMessage('Product updated successfully.');
          this._router.navigateByUrl('/kawasaki');
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
      this._kawasakiService.getProduct(id).pipe(takeUntil(this.unsubscribe)).subscribe((res: Product) => {
        if (res) {
          this.kawasakiProduct = res;
        }
      });
    } else {
      this.kawasakiProduct = new Product();
      this.kawasakiProduct.quantity = '';
      this.kawasakiProduct.qualityLevel = '';
      this.kawasakiProduct.sellingPrice = '';
      this.kawasakiProduct.purchasePrice = '';
    }
  }

  goBack(event: Event): void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/kawasaki'])
    }
  }
}
