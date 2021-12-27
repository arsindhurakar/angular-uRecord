import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { UserRecord } from '../interfaces/user-record';

@Injectable({
  providedIn: 'root',
})
export class UsersRecordService {
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) }; // applied to those that doesnt need jwt

  constructor(private _http: HttpClient) {}

  addUserRecord(userRecord: UserRecord): Observable<UserRecord> {
    return this._http.post<UserRecord>(
      environment.apiBaseUrl + '/add-record',
      userRecord,
      this.noAuthHeader
    );
  }

  getUsersRecord(): Observable<UserRecord> {
    return this._http.get<UserRecord>(
      environment.apiBaseUrl + '/get-records',
      this.noAuthHeader
    );
  }

  removeUserRecord(id: string): Observable<UserRecord> {
    return this._http.delete<UserRecord>(
      environment.apiBaseUrl + '/remove-record/' + id, //id sent as params
      this.noAuthHeader
    );
  }

  updateUserRecord(updates: UserRecord): Observable<UserRecord> {
    return this._http.put<UserRecord>(
      environment.apiBaseUrl + '/update-record',
      updates,
      this.noAuthHeader
    );
  }
}
