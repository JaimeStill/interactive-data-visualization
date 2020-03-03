import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm.dialog.html'
})
export class ConfirmDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, body: string }
  ) { }

  ngOnInit() {
    this.data.title = this.data.title
      ? this.data.title
      : 'Confirm Action?';

    this.data.body = this.data.body
      ? this.data.body
      : 'Are you sure you would like to perform this action?';
  }
}
