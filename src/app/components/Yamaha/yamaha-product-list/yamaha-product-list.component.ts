import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-yamaha-product-list',
  standalone: true,
  imports: [RouterOutlet],
  providers: [Router],
  templateUrl: './yamaha-product-list.component.html',
  styleUrl: './yamaha-product-list.component.css'
})
export class YamahaProductListComponent {
  constructor(private _router: Router) {}
}
