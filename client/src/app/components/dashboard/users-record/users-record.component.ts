import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { UsersRecordService } from 'src/app/services/users-record.service';
import { UserRecord } from '../../../interfaces/user-record';
import { EditRecordComponent } from './edit-record/edit-record.component';
import { RemoveRecordComponent } from './remove-record/remove-record.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-record',
  templateUrl: './users-record.component.html',
  styleUrls: ['./users-record.component.scss'],
})
export class UsersRecordComponent implements OnInit {
  records: object[];
  searchTerm: string;
  isProcessing: boolean = true;

  headElements: object[] = [
    { key: '#', type: 'number' },
    { key: 'Name', type: 'string' },
    { key: 'Email', type: 'string' },
    {
      key: 'Address',
      type: 'string',
    },
    { key: 'Contact No', type: 'number' },
    { key: 'Subscription', type: 'boolean' },
    { key: 'Actions', type: 'others' },
  ];

  keyElements: object[] = [
    { key: 'name', type: 'string' },
    { key: 'email', type: 'string' },
    {
      key: 'address',
      type: 'array',
      nestedKeys: [
        { key: 'street', type: 'string' },
        { key: 'city', type: 'string' },
      ],
    },
    { key: 'contactNo', type: 'number' },
  ];

  newModalRef: MdbModalRef<EditRecordComponent>;
  editModalRef: MdbModalRef<EditRecordComponent>;
  removeModalRef: MdbModalRef<RemoveRecordComponent>;

  constructor(
    private _usersRecordService: UsersRecordService,
    private _modalService: MdbModalService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsersRecord();
  }

  getUsersRecord(): void {
    this._usersRecordService.getUsersRecord().subscribe(
      (res) => {
        this.records = res['records'];
        this.isProcessing = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onNewRecord(): void {
    this.newModalRef = this._modalService.open(AddRecordComponent, {
      ignoreBackdropClick: true,
    });
    this.newModalRef.onClose.subscribe((record: UserRecord) => {
      if (record) {
        this.records.unshift(record);
        this._toastr.success('Added to records.');
      }
    });
  }

  onRemove(record: UserRecord): void {
    this.removeModalRef = this._modalService.open(RemoveRecordComponent, {
      data: { record: record },
      ignoreBackdropClick: true, // prevent closing modal from backdrop click
    });
    this.removeModalRef.onClose.subscribe((id: string) => {
      if (!id) {
        this._toastr.error('Nothing was removed');
      } else {
        let index = this.records.findIndex((rec: UserRecord) => rec._id === id);
        this.records.splice(index, 1);
        this._toastr.success('Removed successfully');
      }
    });
  }

  onEdit(record: UserRecord): void {
    this.editModalRef = this._modalService.open(EditRecordComponent, {
      data: { record: record },
      ignoreBackdropClick: true, // prevent closing modal from backdrop click
    });
    this.editModalRef.onClose.subscribe((record: UserRecord) => {
      if (record) {
        const { _id, name, email, address, contactNo, isSubscribed } = record;
        let index = this.records.findIndex(
          (rec: UserRecord) => rec._id === _id
        );
        this.records[index] = {
          _id,
          name,
          email,
          address,
          contactNo,
          isSubscribed,
        };
        this._toastr.success('Updated successfully');
      } else {
        this._toastr.error('Nothing was updated');
      }
    });
  }
}
