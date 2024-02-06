import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HondaService } from '../../../services/honda.service';
import { Product } from '../../../model/product';
import { Location } from '@angular/common';
import { SnackbarService } from '../../../services/snackbar.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-honda-product-view',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  providers: [Location, HondaService, Router, SnackbarService],
  templateUrl: './honda-product-view.component.html',
  styleUrl: './honda-product-view.component.css'
})
export class HondaProductViewComponent implements OnInit, OnDestroy{
  productId: number = 0;
  hondaProduct: Product = new Product();
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _location: Location, private _hondaService: HondaService, private _router: Router, private _route: ActivatedRoute, private _snackBar:SnackbarService) {}

  ngOnInit(): void {
    this._route.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe((resp: any) => {
      if (resp) {
        this.productId = Number(resp.get('id'));
      }
      this.getProduct(this.productId);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getProduct(productId: number): any {
    this._hondaService.getProduct(productId).pipe(takeUntil(this.unsubscribe)).subscribe((response: Product) => {
      if (response) {
         this.hondaProduct = response;
      }
    });
  }

  updateProduct(hondaProduct: Product): any {
    this._hondaService.updateProduct(hondaProduct).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
      if (response) {
        this._snackBar.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/honda');
      } else {
        this._snackBar.getErrorMessage('Error in product update.');
      }
    })
  }

  addProduct(hondaProduct: Product): any {
    this._hondaService.addProduct(hondaProduct).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
      if (response) {
        this._snackBar.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/honda');
      } else {
        this._snackBar.getErrorMessage('Error in product update.');
      }
    })
  }
    
  goBack($event: MouseEvent): void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/honda'])
    }
  }
}
