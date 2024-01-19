import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-suzuki-product-list',
  standalone: true,
  imports: [RouterOutlet],
  providers: [Router],
  templateUrl: './suzuki-product-list.component.html',
  styleUrl: './suzuki-product-list.component.css'
})
export class SuzukiProductListComponent {
  constructor(private _router: Router) {}
}
