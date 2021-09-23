import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-select-check-all',
  templateUrl: './select-check-all.component.html',
  styleUrls: ['./select-check-all.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectCheckAllComponent implements OnInit {
  @Input() model: FormControl | undefined;
  @Input() values = [];
  @Input() text = 'Select All';

  constructor() { }

  ngOnInit() {
  }

  isChecked(): boolean {
    if (this.model)
      return this.model.value && this.values.length
        && this.model.value.length === this.values.length;
    return false;
  }

  isIndeterminate(): boolean {
    if (this.model)
      return this.model.value && this.values.length && this.model.value.length
        && this.model.value.length < this.values.length;
    return false;
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (this.model) {
      if (change.checked) {
        this.model.setValue(this.values);
      } else {
        this.model.setValue([]);
      }
    }
  }
}
