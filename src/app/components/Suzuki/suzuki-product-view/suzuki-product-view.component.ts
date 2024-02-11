import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { SuzukiService } from '../../../services/suzuki.service';
import { Product } from '../../../model/product';
import { Subject, SubjectLike, takeUntil } from 'rxjs';

@Component({
  selector: 'app-suzuki-product-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, MatInputModule, MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule],
  providers: [SnackbarService, SuzukiService, Location, Router],
  templateUrl: './suzuki-product-view.component.html',
  styleUrl: './suzuki-product-view.component.css'
})
export class SuzukiProductViewComponent implements OnInit, OnDestroy{
  suzukiProduct: Product = new Product();
  productId: number = 0;
  unsubscribe: Subject<void> = new Subject<void>();
  productForm: any;

  constructor(private _snackbarService: SnackbarService, private _suzukiService: SuzukiService, private _location:Location, private _route:ActivatedRoute, private _router:Router) {
    this.productForm = new FormGroup({
      productCode: new FormControl('', Validators.required),
      productName: new FormControl('', Validators.required),
      manufacturerYear: new FormControl(''),
      quantity: new FormControl('', Validators.required),
      qualityLevel: new FormControl('', Validators.required),
      sellingPrice: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required)
    });
  }

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
        this.productForm = new FormGroup({
          id: new FormControl(res.id),
          productCode: new FormControl(res.productCode),
          productName: new FormControl(res.productName),
          manufacturerYear: new FormControl(res.manufacturerYear),
          quantity: new FormControl(res.quantity),
          qualityLevel: new FormControl(res.qualityLevel),
          sellingPrice: new FormControl(res.sellingPrice),
          purchasePrice: new FormControl(res.purchasePrice)
        });
      }
    });
  } 

  addProduct(item: Product): void {
    if (item.productCode && item.productName && item.quantity && item.qualityLevel && item.sellingPrice && item.purchasePrice) {
      this._suzukiService.addProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((res: boolean) => {
        if (res) {
          this._snackbarService.getSuccessMessage('Product added successfully.');
          this._router.navigateByUrl('/suzuki');
        } else {
          this._snackbarService.getErrorMessage('Error in product add.');
        }
      });
    } else {
      this._snackbarService.getErrorMessage('Please fill the required feilds.');
    }
  }

  updateProduct(item: Product): void {
    if (item.productCode && item.productName && item.quantity && item.qualityLevel && item.sellingPrice && item.purchasePrice) {
      this._suzukiService.updateProduct(item).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
        if (response) {
          this._snackbarService.getSuccessMessage('Product updated successfully.');
          this._router.navigateByUrl('/suzuki');
        } else {
          this._snackbarService.getErrorMessage('Error in product update.');
        }
      });
    } else {
      this._snackbarService.getErrorMessage('Please fill the required feilds.');
    }
  }

  goBack($event: MouseEvent): void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigateByUrl('/suzuki');
    }
  }
}
