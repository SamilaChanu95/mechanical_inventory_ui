import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../model/product';
import { TvsService } from '../../../services/tvs.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-tvs-product-view',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  providers: [Router, Location, SnackbarService, TvsService],
  templateUrl: './tvs-product-view.component.html',
  styleUrl: './tvs-product-view.component.css'
})
export class TvsProductViewComponent implements OnInit{
  productId: number = 0;
  tvsProduct: Product = new Product();

  constructor(private _location: Location, private _router:Router, private _route:ActivatedRoute, private _tvsService:TvsService, private _snackbar:SnackbarService) {}
  
  ngOnInit(): void {
    this._route.paramMap.subscribe((resp) => {
      if (resp) {
        this.productId = Number(resp.get('id'));
      }
    });
    this.getProduct(this.productId);
  }

  goBack(event: Event) : void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/bajaj'])
    }
  }

  getProduct(id: number) :any {
    this._tvsService.getProduct(id).subscribe((response) => {
      if (response) {
        this.tvsProduct = response;
      }
    });
  }

  updateProduct(tvsProduct: Product) {
    this._tvsService.updateProduct(tvsProduct).subscribe((response: boolean) => {
      if (response) {
        this._snackbar.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/tvs');
      } else {
        this._snackbar.getErrorMessage('Error in product update.');
      }
    })
  }

  addProduct(tvsProduct: Product) {
    this._tvsService.addProduct(tvsProduct).subscribe((response: boolean) => {
      if (response) {
        this._snackbar.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/tvs');
      } else {
        this._snackbar.getErrorMessage('Error in product add.');
      }
    })
  }

}
