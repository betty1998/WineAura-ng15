import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content>
      <p>{{data.message}}</p>
    </div>
    <div mat-dialog-actions class="d-flex justify-content-center">
      <button mat-button (click)="onCancelClick()">Ok</button>
    </div>
  `
})
export class InfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfoDialogData
  ) {}


  onCancelClick(): void {
    this.dialogRef.close();
  }
}

export interface InfoDialogData {
  title: string;
  message: string;
}
