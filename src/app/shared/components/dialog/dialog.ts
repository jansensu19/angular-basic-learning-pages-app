import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  title: string;
  message: string;
  isSuccess?: boolean;
}

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule],
  styleUrl: './dialog.scss',
  templateUrl: './dialog.html',
})
export class Dialog {
  data: DialogData = inject(MAT_DIALOG_DATA);
}