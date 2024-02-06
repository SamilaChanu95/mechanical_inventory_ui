import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { CommonModule, Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { YamahaService } from '../../../services/yamaha.service';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-yamaha-product-view',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  providers: [Router, Location, SnackbarService, YamahaService],
  templateUrl: './yamaha-product-view.component.html',
  styleUrl: './yamaha-product-view.component.css'
})
export class YamahaProductViewComponent implements OnInit, OnDestroy {
  yamahaProduct: Product = new Product();
  productId: number = 0;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _snackbarService: SnackbarService, private _yamahaservice: YamahaService, private _location:Location, private _route:ActivatedRoute, private _router:Router) {}

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
    this._yamahaservice.getProduct(id).pipe(takeUntil(this.unsubscribe)).subscribe((res: Product) => {
      if (res) {
        this.yamahaProduct = res;
      }
    });
  } 

  addProduct(item: Product): void {
    this._yamahaservice.addProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((res: boolean) => {
      if (res) {
        this._snackbarService.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/yamaha');
      } else {
        this._snackbarService.getErrorMessage('Error in product add.');
      }
    });
  }

  updateProduct(item: Product): void {
    this._yamahaservice.updateProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
      if (response) {
        this._snackbarService.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/yamaha');
      } else {
        this._snackbarService.getErrorMessage('Error in product update.');
      }
    });
  }

  goBack($event: MouseEvent): void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigateByUrl('/yamaha');
    }
  }
}
