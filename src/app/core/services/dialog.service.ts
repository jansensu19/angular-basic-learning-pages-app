import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog, DialogData } from '../../shared/components/dialog/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);

  open(title: string, message: string, isSuccess: boolean = false) {
    return this.dialog.open(Dialog, {
      width: '360px',
      data: { title, message, isSuccess } as DialogData,
    });
  }
}