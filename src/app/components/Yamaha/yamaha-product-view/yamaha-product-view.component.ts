import { Component } from '@angular/core';
import { Product } from '../../../model/product';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { CommonModule, Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { YamahaService } from '../../../services/yamaha.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-yamaha-product-view',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  providers: [Router, Location, SnackbarService, YamahaService],
  templateUrl: './yamaha-product-view.component.html',
  styleUrl: './yamaha-product-view.component.css'
})
export class YamahaProductViewComponent {
  yamahaProduct: Product = new Product();
  productId: number = 0;

  constructor(private _snackbarService: SnackbarService, private _yamahaservice: YamahaService, private _location:Location, private _route:ActivatedRoute, private _router:Router) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((response) => {
      if (response) {
        this.productId = Number(response.get('id'));
      }
    });
    this.getProduct(this.productId);
  }

  getProduct(id: number): void {
    this._yamahaservice.getProduct(id).subscribe((res) => {
      if (res) {
        this.yamahaProduct = res;
      }
    });
  } 

  addProduct(item: Product) {
    this._yamahaservice.addProduct(item).subscribe((res) => {
      if (res) {
        this._snackbarService.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/yamaha');
      } else {
        this._snackbarService.getErrorMessage('Error in product add.');
      }
    });
  }

  updateProduct(item: Product) {
    this._yamahaservice.updateProduct(item).subscribe((response) => {
      if (response) {
        this._snackbarService.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/yamaha');
      } else {
        this._snackbarService.getErrorMessage('Error in product update.');
      }
    });
  }

  goBack($event: MouseEvent) {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigateByUrl('/yamaha');
    }
  }
}
