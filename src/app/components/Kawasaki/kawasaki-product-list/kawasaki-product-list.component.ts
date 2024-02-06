import { CommonModule } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Product } from '../../../model/product';
import { KawasakiService } from '../../../services/kawasaki.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'app-kawasaki-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, KawasakiService, SnackbarService],
  templateUrl: './kawasaki-product-list.component.html',
  styleUrl: './kawasaki-product-list.component.css'
})
export class KawasakiProductListComponent implements OnInit {
  productList: Product [] = [];

  constructor(private _router: Router, private _kawasakiService: KawasakiService, private _snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  deleteItem($event: MouseEvent, item: Product) {
    this._kawasakiService.deleteProduct(item.id).subscribe((response: boolean) => {
      if (response) 
      { 
        this._snackbarService.getSuccessMessage('Product deleted successfully.');
        this.getProductList();
      } else {
        this._snackbarService.getErrorMessage('Error in product delete.');
      }
    }); 
  }

  openItem($event: MouseEvent, item: Product) {
    this._router.navigateByUrl(`/kawasaki/${item.id}`);
  }

  addProduct($event: MouseEvent) {
    this._router.navigateByUrl(`/kawasaki/0`);
  }

  trackById(item: any, index: any): number {
    return item.id;
  }

  getProductList(): void {
    this._kawasakiService.getProductList().subscribe((resp : Product[]) => {
      if (resp) 
      {
        this.productList = resp;
      }
    });
  }
}
