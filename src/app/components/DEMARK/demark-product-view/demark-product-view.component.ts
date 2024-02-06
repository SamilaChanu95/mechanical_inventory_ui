import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { SnackbarService } from '../../../services/snackbar.service';
import { DemarkService } from '../../../services/demark.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-demark-product-view',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  providers: [SnackbarService, DemarkService, Location, Router],
  templateUrl: './demark-product-view.component.html',
  styleUrl: './demark-product-view.component.css'
})
export class DemarkProductViewComponent implements OnInit{
  demarkProduct: Product = new Product();
  productId: number = 0;

  constructor(private _snackBarService: SnackbarService, private _demarkService:DemarkService, private _route: ActivatedRoute, private _router: Router, private _location: Location) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((response) => {
      if (response) {
        this.productId = Number(response.get('id'));
      }
    });
    this.getProduct(this.productId);
  }

  addProduct(item: Product) {
    this._demarkService.addProduct(item).subscribe((res) => {
      if (res) {
        this._snackBarService.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/demark');
      } else {
        this._snackBarService.getErrorMessage('Error in product add.');
      }
    });
  }

  updateProduct(item: Product) {
    this._demarkService.updateProduct(item).subscribe((response) => {
      if (response) {
        this._snackBarService.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/demark');
      } else {
        this._snackBarService.getErrorMessage('Error in product update.');
      }
    });
  }

  getProduct(id: number) {
    this._demarkService.getProduct(id).subscribe((res) => {
      if (res) {
        this.demarkProduct = res;
      }
    });
  }

  goBack(event: Event) : void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/demark'])
    }
  }

}
