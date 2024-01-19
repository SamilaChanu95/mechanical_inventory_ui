import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tvs-product-list',
  standalone: true,
  imports: [RouterOutlet],
  providers: [Router],
  templateUrl: './tvs-product-list.component.html',
  styleUrl: './tvs-product-list.component.css'
})
export class TvsProductListComponent {
  constructor(private _router: Router) {}
}
