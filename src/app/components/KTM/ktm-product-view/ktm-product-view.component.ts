import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { KtmService } from '../../../services/ktm.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-ktm-product-view',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, MatInputModule, MatDatepickerModule, MatFormFieldModule],
  providers: [Router, KtmService, SnackbarService, Location],
  templateUrl: './ktm-product-view.component.html',
  styleUrl: './ktm-product-view.component.css'
})
export class KtmProductViewComponent implements OnInit{
  ktmProduct: Product = new Product();
  productId: number = 0;

  constructor(private _snackBarService: SnackbarService, private _ktmService: KtmService, private _route: ActivatedRoute, private _location:Location, private _router: Router) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((res) => {
      if (res) {
        this.productId = Number(res.get('id'));
      }
    });
    this.getProduct(this.productId);
  }

  getProduct(id: number): void {
    this._ktmService.getProduct(id).subscribe((res) => {
      if (res) {
        this.ktmProduct = res;
      }
    });
  }

  goBack($event: MouseEvent) {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigateByUrl('/ktm');
    }
  }

  addProduct(item: Product) {
    this._ktmService.addProduct(item).subscribe((res) => {
      if (res) {
        this._snackBarService.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/ktm');
      } else {
        this._snackBarService.getErrorMessage('Error in product add.');
      }
    });
  }

  updateProduct(item: Product) {
    this._ktmService.updateProduct(item).subscribe((response) => {
      if (response) {
        this._snackBarService.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/ktm');
      } else {
        this._snackBarService.getErrorMessage('Error in product update.');
      }
    });
  }

}
