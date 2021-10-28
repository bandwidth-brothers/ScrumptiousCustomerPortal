import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuitemData } from '../menu-item-card/menu-item-card.component';

@Component({
  selector: 'app-menu-item-modal',
  templateUrl: './menu-item-modal.component.html',
  styleUrls: ['./menu-item-modal.component.css']
})
export class MenuitemModalComponent {

  constructor(
    public dialogRef: MatDialogRef<MenuitemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuitemData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
