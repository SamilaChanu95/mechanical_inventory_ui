import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../model/product';
import { SnackbarService } from '../../../services/snackbar.service';
import { MahindraService } from '../../../services/mahindra.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-mahindra-product-view',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, MatInputModule, MatDatepickerModule, MatFormFieldModule],
  providers: [Router, Location, MahindraService, SnackbarService],
  templateUrl: './mahindra-product-view.component.html',
  styleUrl: './mahindra-product-view.component.css'
})
export class MahindraProductViewComponent implements OnInit, OnDestroy{
  mahindraProduct: Product = new Product();
  productId: number = 0;
  unsubscribe: Subject<void> = new Subject<void>();
  feildEmpty: boolean = false;

  constructor(private _snackbarService:SnackbarService, private _mahindraService:MahindraService, private _location:Location, private _route:ActivatedRoute, private _router:Router) {}

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

  getProduct(id: number): void {
    if (id > 0) {
      this._mahindraService.getProduct(id).pipe(takeUntil(this.unsubscribe)).subscribe((res: Product) => {
        if (res) {
          this.mahindraProduct = res;
        }
      });
    } else {
      this.mahindraProduct = new Product();
      this.mahindraProduct.quantity = '';
      this.mahindraProduct.qualityLevel = '';
      this.mahindraProduct.sellingPrice = '';
      this.mahindraProduct.purchasePrice = '';
    }
    
  }

  addProduct(item: Product): void {
    if (item.productCode && item.productName && item.quantity && item.qualityLevel && item.purchasePrice && item.sellingPrice) {
      this._mahindraService.addProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((res: boolean) => {
        if (res) {
          this._snackbarService.getSuccessMessage('Product added successfully.');
          this._router.navigateByUrl('/mahindra');
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
    if (item.productCode && item.productName && item.quantity && item.qualityLevel && item.purchasePrice && item.sellingPrice) {
      this._mahindraService.updateProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
        if (response) {
          this._snackbarService.getSuccessMessage('Product updated successfully.');
          this._router.navigateByUrl('/mahindra');
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

  goBack($event: MouseEvent): void {
    if(window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigateByUrl('/mahindra');
    }
  }
}
