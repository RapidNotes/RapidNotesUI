import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDeleteDialogData } from 'src/app/_models/confirm-delete-dialog-data';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {
  heading: string

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>) {
      this.heading = "Are you sure you want to delete this note?"
    }

  ngOnInit(): void {
  }

}
