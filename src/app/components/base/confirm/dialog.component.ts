import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
  <mat-dialog-content>{{data.title}}</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close color="accent">No</button>
    <button mat-button [mat-dialog-close]="true" color="primary">Yes</button>
  </mat-dialog-actions>
  `
})
export class DialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
