import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-kawasaki-product-list',
  standalone: true,
  imports: [RouterOutlet],
  providers: [Router],
  templateUrl: './kawasaki-product-list.component.html',
  styleUrl: './kawasaki-product-list.component.css'
})
export class KawasakiProductListComponent {
  constructor(private _router: Router) {}
}
