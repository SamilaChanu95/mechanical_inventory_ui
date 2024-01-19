import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HttpClientModule, MatFormFieldModule, MatDatepickerModule, MatSnackBarModule],
  providers: [Router],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mechanical_inventory_ui';

  constructor(private _router: Router) {}

  navigateToPage(event: Event, productUrl: string): void {
    console.log(`Url is ${productUrl}.`);
    this._router.navigateByUrl(`${productUrl}`).then(
      (resp) => {
        console.log(`Navigation work with ${productUrl}.`);
      },
      (error) => {
        console.error(`Navigation error with ${productUrl}.`);
      }
    );
  }
}
