import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  public getSuccessMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      panelClass: ['success-message', 'position-absolute']
    });
  }

  public getErrorMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      panelClass: ['error-message', 'position-absolute']
    })
  }
}
