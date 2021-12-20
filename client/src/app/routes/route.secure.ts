import { Routes } from '@angular/router';

import { HomeComponent, UsersRecordComponent } from '../components';

export const RouteSecure: Routes = [
  {
    path: 'dashboard',
    component: HomeComponent,
  },
  {
    path: 'users-record',
    component: UsersRecordComponent,
  },
];
