import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-demark-product-list',
  standalone: true,
  imports: [RouterOutlet],
  providers: [Router],
  templateUrl: './demark-product-list.component.html',
  styleUrl: './demark-product-list.component.css'
})
export class DemarkProductListComponent {
  constructor(private _router: Router) {}
}
