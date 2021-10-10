import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuitemData } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-menuitem-modal',
  templateUrl: './menuitem-modal.component.html',
  styleUrls: ['./menuitem-modal.component.css']
})
export class MenuitemModalComponent {

  constructor(
    public dialogRef: MatDialogRef<MenuitemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuitemData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
