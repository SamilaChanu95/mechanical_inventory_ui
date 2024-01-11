import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../model/product';
import { ProductService } from '../../../services/product-service';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { time } from 'console';

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
  imports: [FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  providers: [Location, Router, ProductService, {
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

export class ProductViewComponent implements OnInit {
  bajajProduct: Product = new Product();
  productId: number = 0;
  constructor(private _location: Location, private _router: Router, private _route: ActivatedRoute, private _product: ProductService) {}
  @ViewChild('picker', { static: false }) private picker!: MatDatepicker<Date>;


  ngOnInit() : void {
    this._route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id')); 
    });
    this.getProductDetails(this.productId);
  }

  goBack(event: Event) : void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigate(['/bajaj'])
    }
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>){
    // let { _d } = event;
    var selectedYear = normalizedYear.year();
    console.log('selected Year', selectedYear);
    this.bajajProduct.manufacturerYear = new Date(selectedYear, 0, 1);
    //datepicker.close();
    this.picker.close();
  }

  getProductDetails(id: number): void {
    this._product.getProduct(id).subscribe((resp : Product) => {
      this.bajajProduct = resp;
    });
  }
}
