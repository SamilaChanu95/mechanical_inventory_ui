import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ktm-product-list',
  standalone: true,
  imports: [RouterOutlet],
  providers: [Router],
  templateUrl: './ktm-product-list.component.html',
  styleUrl: './ktm-product-list.component.css'
})
export class KtmProductListComponent {
  constructor(private _router: Router) {}
}
