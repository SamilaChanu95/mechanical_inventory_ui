import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Product } from '../../../model/product';
import { HondaService } from '../../../services/honda.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-honda-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, HondaService, SnackbarService],
  templateUrl: './honda-product-list.component.html',
  styleUrl: './honda-product-list.component.css'
})
export class HondaProductListComponent implements OnInit {
  productList: Product [] = [];

  constructor(private _router: Router, private _hondaService:HondaService, private _snackbarService:SnackbarService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList():any {
    this._hondaService.getProductList().subscribe((resp: Product[]) => {
      if (resp) {
        this.productList = resp;
      }
    });
  }

  addProduct(event : MouseEvent) : void {
    this._router.navigateByUrl('/honda/0');
  }

  openItem(event: MouseEvent, item: Product) {
    this._router.navigateByUrl(`/honda/${item.id}`);
  }

  deleteItem(event: MouseEvent, item: Product) {
    this._hondaService.deleteProduct(item.id).subscribe((response: boolean) => {
      if (response) {
        this._snackbarService.getSuccessMessage('Product deleted successfully.');
        this.getProductList();
      } else {
        this._snackbarService.getErrorMessage('Error in product delete.');
      }
    });
  }

  trackById(item: any, index: any): number {
    return item.id;
  }

}
