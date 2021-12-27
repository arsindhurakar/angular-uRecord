import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserRecord } from '../../../../interfaces';
import { UsersRecordService, SharedFormService } from '../../../../services';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.scss'],
})
export class EditRecordComponent implements OnInit {
  record: UserRecord;
  formEditRecord: FormGroup;
  isProcessing: boolean;

  constructor(
    public modalRef: MdbModalRef<EditRecordComponent>,
    private _formBuilder: FormBuilder,
    private _sharedFormService: SharedFormService,
    private _usersRecordService: UsersRecordService
  ) {
    this.setForm();
  }

  ngOnInit(): void {
    this.formEditRecord.get('sharedGroup').patchValue(this.record);
  }

  setForm() {
    this.formEditRecord = this._formBuilder.group({
      sharedGroup: this._sharedFormService.sharedForm(),
    });
  }

  onSaveChanges() {
    this.isProcessing = true;
    if (!this.formEditRecord.invalid) {
      this._usersRecordService
        .updateUserRecord(this.formEditRecord.get('sharedGroup').value)
        .subscribe(
          (res) => {
            if (res.success === true) {
              this.modalRef.close(this.formEditRecord.get('sharedGroup').value);
            } else {
              this.modalRef.close();
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.isProcessing = false;
    }
  }
}
