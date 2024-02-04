import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Product } from '../../../model/product';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TvsService } from '../../../services/tvs.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-tvs-product-list',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, CommonModule],
  providers: [Router, TvsService, SnackbarService],
  templateUrl: './tvs-product-list.component.html',
  styleUrl: './tvs-product-list.component.css'
})
export class TvsProductListComponent implements OnInit{
  productList: Product [] = [];

  constructor(private _router: Router, private _tvsService:TvsService, private _snackbarService:SnackbarService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  addProduct(event : Event) : void {
    this._router.navigateByUrl('/tvs/0');
  }

  getProductList():any {
    this._tvsService.getProductList().subscribe((resp: Product[]) => {
      if (resp) {
        this.productList = resp;
      }
    });
  }

  openItem(event: Event, item: Product) {
    this._router.navigateByUrl(`/tvs/${item.id}`);
  }

  deleteItem(event: Event, item: Product) {
    this._tvsService.deleteProduct(item.id).subscribe((response: boolean) => {
      if (response) {
        this._snackbarService.getSuccessMessage('Product deleted successfully.');
        this.getProductList();
      } else {
        this._snackbarService.getErrorMessage('Error in product delete.');
      }
    });
  }

  trackById(index:any, item: any): number {
    return item.id;
  }
}
