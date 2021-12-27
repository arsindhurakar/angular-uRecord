import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent, NotFoundComponent } from './components';

import { AuthGuard } from './auth';
import { RoutePublic, RouteSecure } from './routes';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', children: RoutePublic },
  {
    path: '',
    component: DashboardComponent,
    children: RouteSecure,
    canActivate: [AuthGuard],
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
