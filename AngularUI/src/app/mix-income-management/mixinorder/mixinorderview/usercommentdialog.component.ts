import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
  
@Component({
  selector: 'usercommentdialog',
  templateUrl: 'usercommentdialog.component.html',
})
export class UserCommentDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<UserCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
}