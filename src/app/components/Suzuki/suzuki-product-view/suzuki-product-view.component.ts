import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { SuzukiService } from '../../../services/suzuki.service';
import { Product } from '../../../model/product';
import { Subject, SubjectLike, takeUntil } from 'rxjs';

@Component({
  selector: 'app-suzuki-product-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, MatInputModule, MatFormFieldModule, MatDatepickerModule],
  providers: [SnackbarService, SuzukiService, Location, Router],
  templateUrl: './suzuki-product-view.component.html',
  styleUrl: './suzuki-product-view.component.css'
})
export class SuzukiProductViewComponent implements OnInit, OnDestroy{
  suzukiProduct: Product = new Product();
  productId: number = 0;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _snackbarService: SnackbarService, private _suzukiService: SuzukiService, private _location:Location, private _route:ActivatedRoute, private _router:Router) {}

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
    this._suzukiService.getProduct(id).pipe(takeUntil(this.unsubscribe)).subscribe((res: Product) => {
      if (res) {
        this.suzukiProduct = res;
      }
    });
  } 

  addProduct(item: Product): void {
    this._suzukiService.addProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((res: boolean) => {
      if (res) {
        this._snackbarService.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/suzuki');
      } else {
        this._snackbarService.getErrorMessage('Error in product add.');
      }
    });
  }

  updateProduct(item: Product): void {
    this._suzukiService.updateProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
      if (response) {
        this._snackbarService.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/suzuki');
      } else {
        this._snackbarService.getErrorMessage('Error in product update.');
      }
    });
  }

  goBack($event: MouseEvent): void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigateByUrl('/suzuki');
    }
  }
}
