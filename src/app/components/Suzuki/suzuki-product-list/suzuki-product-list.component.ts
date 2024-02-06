import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Product } from '../../../model/product';
import { SuzukiService } from '../../../services/suzuki.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suzuki-product-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [Router, SnackbarService, SuzukiService],
  templateUrl: './suzuki-product-list.component.html',
  styleUrl: './suzuki-product-list.component.css'
})
export class SuzukiProductListComponent implements OnInit {
  productList: Product [] = [];  

  constructor(private _router: Router, private _suzukiService: SuzukiService, private _snackBarService: SnackbarService) {}
  
  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this._suzukiService.getProductList().subscribe((res: Product[]) => {
      if (res) 
      {
        this.productList = res;
      }
    });
  }

  deleteItem($event: MouseEvent, item: Product) {
    this._suzukiService.deleteProduct(item.id).subscribe((response: boolean) => {
      if (response) 
      { 
        this._snackBarService.getSuccessMessage('Product deleted successfully.');
        this.getProductList();
      } else {
        this._snackBarService.getErrorMessage('Error in product delete.');
      }
    }); 
  }

  openItem($event: MouseEvent, item: Product) {
    this._router.navigateByUrl(`/suzuki/${item.id}`);
  }

  addProduct($event: MouseEvent) {
    this._router.navigateByUrl(`/suzuki/0`);
  }

  trackById(item: any, index: any): number {
    return item.id;
  }
}
