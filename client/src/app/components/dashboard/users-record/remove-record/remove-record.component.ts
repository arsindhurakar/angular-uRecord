import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { UsersRecordService } from '../../../../services';
import { UserRecord } from '../../../../interfaces';

@Component({
  selector: 'app-remove-record',
  templateUrl: './remove-record.component.html',
  styleUrls: ['./remove-record.component.scss'],
})
export class RemoveRecordComponent implements OnInit {
  record: UserRecord;
  isProcessing: boolean = false;

  constructor(
    private _usersRecordService: UsersRecordService,
    public modalRef: MdbModalRef<RemoveRecordComponent>
  ) {}

  ngOnInit(): void {}

  onRemove() {
    this.isProcessing = true;
    this._usersRecordService.removeUserRecord(this.record._id).subscribe(
      (res) => {
        if (res.success === true) {
          this.modalRef.close(this.record._id);
        } else {
          this.modalRef.close();
          this.isProcessing = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
