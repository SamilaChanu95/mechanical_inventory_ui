import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  providers: [Router],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    // this._route.url.subscribe(m =>console.log(m[0].path)); // this logs "detail"
  }
  
  navigateToBajaj(event: Event): void {
    this._router.navigateByUrl('/bajaj');
  }

  navigateToTVS(event : Event): void {
    this._router.navigateByUrl('/tvs');
  }

  navigateToHero(event : Event): void {
    this._router.navigateByUrl('/hero');
  }
}
