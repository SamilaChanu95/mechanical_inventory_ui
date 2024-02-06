import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { SuzukiService } from '../../../services/suzuki.service';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-suzuki-product-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, MatInputModule, MatFormFieldModule, MatDatepickerModule],
  providers: [SnackbarService, SuzukiService, Location, Router],
  templateUrl: './suzuki-product-view.component.html',
  styleUrl: './suzuki-product-view.component.css'
})
export class SuzukiProductViewComponent implements OnInit{
  suzukiProduct: Product = new Product();
  productId: number = 0;

  constructor(private _snackbarService: SnackbarService, private _suzukiService: SuzukiService, private _location:Location, private _route:ActivatedRoute, private _router:Router) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((response) => {
      if (response) {
        this.productId = Number(response.get('id'));
      }
    });
    this.getProduct(this.productId);
  }

  getProduct(id: number): void {
    this._suzukiService.getProduct(id).subscribe((res) => {
      if (res) {
        this.suzukiProduct = res;
      }
    });
  } 

  addProduct(item: Product) {
    this._suzukiService.addProduct(item).subscribe((res) => {
      if (res) {
        this._snackbarService.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/suzuki');
      } else {
        this._snackbarService.getErrorMessage('Error in product add.');
      }
    });
  }

  updateProduct(item: Product) {
    this._suzukiService.updateProduct(item).subscribe((response) => {
      if (response) {
        this._snackbarService.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/suzuki');
      } else {
        this._snackbarService.getErrorMessage('Error in product update.');
      }
    });
  }

  goBack($event: MouseEvent) {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigateByUrl('/suzuki');
    }
  }
}
