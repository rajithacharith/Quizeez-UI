import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {PaperComponent} from '../paper/paper.component';
import {PaperListComponent} from '../paper-list/paper-list.component';
import {LoginComponent} from '../login/login.component';
import {ReviewComponent} from '../review/review.component';
import {GuardserviceService} from '../services/guardservice.service';
import {AdminDashboardComponent} from '../admin-dashboard/admin-dashboard.component';

import { RegisterPageComponent } from '../register-page/register-page.component';

import { from } from 'rxjs';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [GuardserviceService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardserviceService]
  },
  {
    path: 'paper',
    component: PaperComponent,
    canActivate: [GuardserviceService]
  },
  {
    path: 'paper-list',
    component: PaperListComponent,
    canActivate: [GuardserviceService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [GuardserviceService]
  },
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [GuardserviceService]
  },
  {
    path: 'register',
    component : RegisterPageComponent,
    canActivate: [GuardserviceService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
