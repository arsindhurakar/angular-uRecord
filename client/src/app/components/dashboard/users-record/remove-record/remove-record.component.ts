import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { UsersRecordService } from 'src/app/services/users-record.service';
import { UserRecord } from 'src/app/interfaces/user-record';

@Component({
  selector: 'app-remove-record',
  templateUrl: './remove-record.component.html',
  styleUrls: ['./remove-record.component.scss'],
})
export class RemoveRecordComponent implements OnInit {
  record: UserRecord;

  constructor(
    private _usersRecordService: UsersRecordService,
    public modalRef: MdbModalRef<RemoveRecordComponent>
  ) {}

  ngOnInit(): void {}

  onRemove() {
    this._usersRecordService.removeUserRecord(this.record._id).subscribe(
      (res) => {
        if (res.success === true) {
          this.modalRef.close(this.record._id);
        } else {
          this.modalRef.close();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
