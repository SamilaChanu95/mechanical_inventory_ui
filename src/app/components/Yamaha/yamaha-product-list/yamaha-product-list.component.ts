import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { YamahaService } from '../../../services/yamaha.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-yamaha-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, YamahaService, SnackbarService],
  templateUrl: './yamaha-product-list.component.html',
  styleUrl: './yamaha-product-list.component.css'
})
export class YamahaProductListComponent implements OnInit {
  productList: Product [] = [];

  constructor(private _router: Router, private _snackBarService: SnackbarService, private _yamahaService: YamahaService) {}
  
  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this._yamahaService.getProductList().subscribe((response: Product []) => {
      if (response) {
        this.productList = response;
      }
    });
  }

  openItem($event: MouseEvent, item: Product) {
    this._router.navigateByUrl(`/yamaha/${item.id}`);
  }

  deleteItem($event: MouseEvent, item: Product) {
    this._yamahaService.deleteProduct(item.id).subscribe((response: boolean) => {
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
    this._router.navigateByUrl(`/yamaha/0`);
  }

  trackById(index: any, item: any): number {
    return item.id;
  }
}
