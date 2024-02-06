import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { KawasakiService } from '../../../services/kawasaki.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kawasaki-product-view',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule],
  providers: [KawasakiService, SnackbarService, Location, Router],
  templateUrl: './kawasaki-product-view.component.html',
  styleUrl: './kawasaki-product-view.component.css'
})
export class KawasakiProductViewComponent implements OnInit{
  productId: number = 0;
  kawasakiProduct: Product = new Product();

  constructor(private _kawasakiService: KawasakiService, private _snackbarService:SnackbarService, private _route:ActivatedRoute, private _location:Location, private _router: Router) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((response) => {
      if (response) {
        this.productId = Number(response.get('id'));
      }
    });
    this.getProduct(this.productId);
  }

  addProduct(item: Product) {
    this._kawasakiService.addProduct(item).subscribe((res) => {
      if (res) {
        this._snackbarService.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/kawasaki');
      } else {
        this._snackbarService.getErrorMessage('Error in product add.');
      }
    });
  }

  updateProduct(item: Product) {
    this._kawasakiService.updateProduct(item).subscribe((response) => {
      if (response) {
        this._snackbarService.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/kawasaki');
      } else {
        this._snackbarService.getErrorMessage('Error in product update.');
      }
    });
  }

  getProduct(id: number) {
    this._kawasakiService.getProduct(id).subscribe((res) => {
      if (res) {
        this.kawasakiProduct = res;
      }
    });
  }

  goBack(event: Event) : void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/kawasaki'])
    }
  }
}
