import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {PaperComponent} from '../paper/paper.component';
import {PaperListComponent} from '../paper-list/paper-list.component';
import {LoginComponent} from '../login/login.component';
import {ReviewComponent} from '../review/review.component';

import {AdminDashboardComponent} from '../admin-dashboard/admin-dashboard.component';

import { RegisterPageComponent } from "../register-page/register-page.component";

import {  } from 'rxjs';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'paper',
    component: PaperComponent
  },
  {
    path: 'paper-list',
    component: PaperListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent
  },
  {
    path: 'review',
    component: ReviewComponent
  },
  {
    path: 'register',
    component : RegisterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
