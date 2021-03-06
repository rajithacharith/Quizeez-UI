import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {PaperComponent} from '../paper/paper.component';
import {PaperListComponent} from '../paper-list/paper-list.component';
import { SubjectListComponent } from "../subject-list/subject-list.component";
import {LoginComponent} from '../login/login.component';
import {ReviewComponent} from '../review/review.component';
import {GuardserviceService} from '../services/guardservice.service';
import {AdminGuardService} from '../services/admin-guard.service';
import {AdminPaperComponent } from "../admin-paper/admin-paper.component";
import {AdminDashboardComponent} from '../admin-dashboard/admin-dashboard.component';
import { ViewPaperComponent } from "../view-paper/view-paper.component";

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
     canActivate: [AdminGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [GuardserviceService]
  },
  {
    path: 'register',
    component : RegisterPageComponent
  },
  {
    path: 'add-questions',
    component : AdminPaperComponent,
    canActivate: [AdminGuardService]
  },
  {
    path : 'subject-list',
    component : SubjectListComponent,
    canActivate: [AdminGuardService]
  },
  {
    path : 'view-paper',
    component : ViewPaperComponent,
    canActivate: [AdminGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
