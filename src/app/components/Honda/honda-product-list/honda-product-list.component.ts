import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-honda-product-list',
  standalone: true,
  imports: [RouterOutlet],
  providers: [Router],
  templateUrl: './honda-product-list.component.html',
  styleUrl: './honda-product-list.component.css'
})
export class HondaProductListComponent {
  constructor(private _router: Router) {}
}
