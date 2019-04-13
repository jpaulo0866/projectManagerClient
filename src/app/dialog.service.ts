import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogComponent } from './components/base/confirm/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogComponent: MatDialogRef<DialogComponent>;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  confirm(message?: string) {
    return new Promise(resolve => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        title: message
      };

      this.dialogComponent = this.dialog.open(DialogComponent, dialogConfig);

      this.dialogComponent.afterClosed().subscribe((result) => {
        return resolve(result);
      });

    });
  }

  showSnackMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
