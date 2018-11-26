import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {PaperComponent} from '../paper/paper.component';
import {PaperListComponent} from '../paper-list/paper-list.component';
import {LoginComponent} from '../login/login.component';
import {ReviewComponent} from '../review/review.component';
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
    path: 'review',
    component: ReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
