import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../model/product';
import { ProductService } from '../../../services/product-service';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { SnackbarService } from '../../../services/snackbar.service';
import { Subject, takeUntil } from 'rxjs';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, CommonModule, RouterOutlet, ReactiveFormsModule],
  providers: [Location, Router, SnackbarService, ProductService, {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css',
  animations: []
})

export class ProductViewComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void> ();
  bajajProduct: Product = new Product();
  productId: number = 0;
  bajajForm: any;
  @ViewChild('picker', { static: false }) private picker!: MatDatepicker<Date>;
  feildEmpty: boolean = false;

  constructor(private _location: Location, private _router: Router, private _route: ActivatedRoute, private _product: ProductService, private _snackBarService: SnackbarService) {
    this.bajajForm = new FormGroup({
      productCode: new FormControl('', Validators.required),
      productName: new FormControl('', Validators.required),
      manufacturerYear: new FormControl(''),
      quantity: new FormControl('', Validators.required),
      qualityLevel: new FormControl('', Validators.required),
      sellingPrice: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required)
    })
  }

  ngOnInit() : void {
    this._route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id')); 
    });
    this.getProductDetails(this.productId);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  goBack(event: Event) : void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/bajaj'])
    }
  }

  // This is for mat-date-picker for select year and stop the future process hold with yearSelected() event
  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>){
    // let { _d } = event;
    var selectedYear = normalizedYear.year();
    this.bajajProduct.manufacturerYear = new Date(selectedYear, 0, 1);
    // datepicker.close();
    this.picker.close();
  }

  getProductDetails(id: number): void {
    this._product.getProduct(id).pipe(takeUntil(this.unsubscribe)).subscribe((resp : Product) => {
      this.bajajProduct = resp;
      this.bajajForm = new FormGroup({
        id : new FormControl(this.bajajProduct.id),
        productCode: new FormControl(this.bajajProduct.productCode),
        productName: new FormControl(this.bajajProduct.productName),
        manufacturerYear: new FormControl(this.bajajProduct.manufacturerYear),
        quantity: new FormControl(this.bajajProduct.quantity),
        qualityLevel: new FormControl(this.bajajProduct.qualityLevel),
        sellingPrice: new FormControl(this.bajajProduct.sellingPrice),
        purchasePrice: new FormControl(this.bajajProduct.purchasePrice)
      }); 
    });
  }

  updateProduct(bajajProduct: Product): void {
    if (bajajProduct.productCode && bajajProduct.productName && bajajProduct.quantity && bajajProduct.qualityLevel && bajajProduct.sellingPrice && bajajProduct.purchasePrice) {
      this._product.updateProduct(bajajProduct).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
        if (response) {
          this._snackBarService.getSuccessMessage('Product updated successfully.');
          this._router.navigateByUrl('bajaj');
        } else {
          this._snackBarService.getErrorMessage('Error in product update.');
        }
      })
    } else {
      this.feildEmpty = true;
      this._snackBarService.getErrorMessage('Please fill the all required feilds.');
    }
  }

  addProduct(bajajProduct: Product): void {
    //this.feildEmpty = false;
    if (bajajProduct.productCode && bajajProduct.productName && bajajProduct.quantity && bajajProduct.qualityLevel && bajajProduct.sellingPrice && bajajProduct.purchasePrice) {
      this._product.addProduct(bajajProduct).pipe(takeUntil(this.unsubscribe)).subscribe((response: boolean) => {
        if (response) {
          this._snackBarService.getSuccessMessage('Product added successfully.');
          this._router.navigateByUrl('bajaj');
        } else {
          this._snackBarService.getErrorMessage('Error in product add.');
        }
      })
    } else {
      this.feildEmpty = true;
      this._snackBarService.getErrorMessage('Please fill the all required feilds.');
    }
  }
}
