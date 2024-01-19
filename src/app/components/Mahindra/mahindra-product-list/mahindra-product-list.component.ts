import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mahindra-product-list',
  standalone: true,
  imports: [RouterOutlet],
  providers: [Router],
  templateUrl: './mahindra-product-list.component.html',
  styleUrl: './mahindra-product-list.component.css'
})
export class MahindraProductListComponent {
  constructor(private _router: Router) {}
}
