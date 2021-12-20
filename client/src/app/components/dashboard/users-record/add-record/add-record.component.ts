import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { SharedFormService } from 'src/app/services/shared-form.service';
import { UsersRecordService } from 'src/app/services/users-record.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss'],
})
export class AddRecordComponent implements OnInit {
  formAddRecord: FormGroup = undefined;

  isProcessing: boolean = false;

  emailRegex: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  get sharedGroup() {
    return this.formAddRecord.get('sharedGroup');
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _sharedFormService: SharedFormService,
    private _usersRecordService: UsersRecordService,
    private _toastr: ToastrService,
    public modalRef: MdbModalRef<AddRecordComponent>
  ) {}

  ngOnInit(): void {
    this.formAddRecord = this._formBuilder.group({
      sharedGroup: this._sharedFormService.sharedForm(),
    });

    // console.log(this.sharedForm);
    // //conditional validation
    // this.sharedForm.get('isSubscribed').valueChanges.subscribe((isChecked) => {
    //   const email = this.sharedForm.get('email');
    //   if (isChecked) {
    //     email.setValidators([
    //       Validators.required,
    //       Validators.pattern(this.emailRegex),
    //     ]);
    //   } else {
    //     email.clearValidators();
    //   }
    //   email.updateValueAndValidity();
    // });
  }

  onAddRecord() {
    this.isProcessing = true;
    if (!this.formAddRecord.invalid) {
      this._usersRecordService.addUserRecord(this.sharedGroup.value).subscribe(
        (res) => {
          this.modalRef.close(res);
        },
        (err) => {
          if (err.status === 422) {
            this._toastr.error(err.error[0]);
            this.isProcessing = false;
          }
        }
      );
    } else {
      this.isProcessing = false;
      this._toastr.error('Invalid details');
    }
  }
}
