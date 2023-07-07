import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>Add new {{title}}</h1>

    <div mat-dialog-content>
      <form [formGroup]="form">
        <div class="form-group">
          <label class="mt-2 mb-1">New {{title}}</label>
          <input class="form-control" formControlName="newOption">
        </div>
      </form>
    </div>

    <div mat-dialog-actions>
      <button mat-button (click)="onCancelClick()">Cancel</button>
      <button mat-button (click)="onAddClick()" [disabled]="form.invalid">Add</button>
    </div>
  `
})
export class AddOptionDialogComponent {
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public title: string,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      newOption: ['',[Validators.required]]
    });
  }

  onAddClick(): void {
    this.dialogRef.close(this.form.get('newOption')?.value);
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
}



