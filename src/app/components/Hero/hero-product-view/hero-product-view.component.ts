import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { HeroService } from '../../../services/hero.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hero-product-view',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  providers: [Router, SnackbarService, Location, HeroService],
  templateUrl: './hero-product-view.component.html',
  styleUrl: './hero-product-view.component.css'
})
export class HeroProductViewComponent implements OnInit, OnDestroy {
  productId: number = 0;
  heroProduct: Product = new Product();
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _heroService: HeroService, private _snackbarService: SnackbarService, private _location: Location, private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      if (res) {
        this.productId = Number(res.get('id'));
      }
    });
    this.getProduct(this.productId);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  addProduct(item: Product): void {
    this._heroService.addProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((res: boolean) => {
      if (res) {
        this._snackbarService.getSuccessMessage('Product added successfully.');
        this._router.navigateByUrl('/hero');
      } else {
        this._snackbarService.getErrorMessage('Error in product add.');
      }
    });
  }

  updateProduct(item: Product): void {
    this._heroService.updateProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
      if (response) {
        this._snackbarService.getSuccessMessage('Product updated successfully.');
        this._router.navigateByUrl('/hero');
      } else {
        this._snackbarService.getErrorMessage('Error in product update.');
      }
    });
  }

  getProduct(id: number): void {
    this._heroService.getProduct(id).pipe(takeUntil(this.unsubscribe)).subscribe((res: Product) => {
      if (res) {
        this.heroProduct = res;
      }
    });
  }

  goBack(event: Event) : void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/hero'])
    }
  }
}
