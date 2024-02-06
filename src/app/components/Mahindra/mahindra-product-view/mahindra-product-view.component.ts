import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../model/product';
import { SnackbarService } from '../../../services/snackbar.service';
import { MahindraService } from '../../../services/mahindra.service';

@Component({
  selector: 'app-mahindra-product-view',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, MatInputModule, MatDatepickerModule, MatFormFieldModule],
  providers: [Router, Location, MahindraService, SnackbarService],
  templateUrl: './mahindra-product-view.component.html',
  styleUrl: './mahindra-product-view.component.css'
})
export class MahindraProductViewComponent implements OnInit{
  mahindraProduct: Product = new Product();
  productId: number = 0;

  constructor(private _snackbarService:SnackbarService, private _mahindraService:MahindraService, private _location:Location, private _route:ActivatedRoute, private _router:Router) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((response) => {
      if (response) {
        this.productId = Number(response.get('id'));
      }
    });
    this.getProduct(this.productId);
  }

  getProduct(id: number): void {
    this._mahindraService.getProduct(id).subscribe((res) => {
      if (res) {
        this.mahindraProduct = res;
      }
    });
  }

  addProduct(item: Product) {
    this._mahindraService.addProduct(item).subscribe((res) => {
      if (res) {
        this._snackbarService.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/mahindra');
      } else {
        this._snackbarService.getErrorMessage('Error in product add.');
      }
    });
  }

  updateProduct(item: Product) {
    this._mahindraService.updateProduct(item).subscribe((response) => {
      if (response) {
        this._snackbarService.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/mahindra');
      } else {
        this._snackbarService.getErrorMessage('Error in product update.');
      }
    });
  }

  goBack($event: MouseEvent) {
    if(window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigateByUrl('/mahindra');
    }
  }
}
