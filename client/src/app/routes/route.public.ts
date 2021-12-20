import { Routes } from '@angular/router';
import { LoginComponent, RegistrationComponent } from '../components';

export const RoutePublic: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'registration', component: RegistrationComponent },
];
