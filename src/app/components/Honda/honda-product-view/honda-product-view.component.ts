import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HondaService } from '../../../services/honda.service';
import { Product } from '../../../model/product';
import { Location } from '@angular/common';
import { SnackbarService } from '../../../services/snackbar.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-honda-product-view',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  providers: [Location, HondaService, Router, SnackbarService],
  templateUrl: './honda-product-view.component.html',
  styleUrl: './honda-product-view.component.css'
})
export class HondaProductViewComponent implements OnInit {
  productId: number = 0;
  hondaProduct: Product = new Product();

  constructor(private _location: Location, private _hondaService: HondaService, private _router: Router, private _route: ActivatedRoute, private _snackBar:SnackbarService) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((resp) => {
      if (resp) 
      {
        this.productId = Number(resp.get('id'));
      }
      this.getProduct(this.productId);
    });
  }

  getProduct(productId: number):any {
    this._hondaService.getProduct(productId).subscribe((response) => {
      if (response) 
      {
         this.hondaProduct = response;
      }
    });
  }

  updateProduct(hondaProduct: Product): any {
    this._hondaService.updateProduct(hondaProduct).subscribe((response: boolean) => {
      if (response) {
        this._snackBar.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/honda');
      } else {
        this._snackBar.getErrorMessage('Error in product update.');
      }
    })
  }

  addProduct(hondaProduct: Product): any {
    this._hondaService.addProduct(hondaProduct).subscribe((response: boolean) => {
      if (response) {
        this._snackBar.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/honda');
      } else {
        this._snackBar.getErrorMessage('Error in product update.');
      }
    })
  }
    
  goBack($event: MouseEvent) {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/honda'])
    }
  }
}
