import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Product } from '../../../model/product';
import { KtmService } from '../../../services/ktm.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ktm-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, SnackbarService, KtmService],
  templateUrl: './ktm-product-list.component.html',
  styleUrl: './ktm-product-list.component.css'
})
export class KtmProductListComponent {
  productList: Product[] = [];

  constructor(private _router: Router, private _ktmService: KtmService, private _snackBarService: SnackbarService) {}

  getProductList(): void {
    this._ktmService.getProductList().subscribe((response: Product[]) => {
      if (response) {
        this.productList = response;
      }
    });
  }

  openItem($event: MouseEvent, item: Product) {
    this._router.navigateByUrl(`/ktm/${item.id}`);
  }

  deleteItem($event: MouseEvent, item: Product) {
    this._ktmService.deleteProduct(item.id).subscribe((response: boolean) => {
      if (response) 
      { 
        this._snackBarService.getSuccessMessage('Product deleted successfully.');
        this.getProductList();
      } else {
        this._snackBarService.getErrorMessage('Error in product delete.');
      }
    }); 
  }

  addProduct($event: MouseEvent) {
    this._router.navigateByUrl(`/ktm/0`);
  }

  trackById(item: any, index: any): number {
    return item.id;
  }

}
