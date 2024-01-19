import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-hero-product-list',
  standalone: true,
  imports: [RouterOutlet],
  providers: [Router],
  templateUrl: './hero-product-list.component.html',
  styleUrl: './hero-product-list.component.css'
})
export class HeroProductListComponent {
  constructor(private _router: Router) {}
}
