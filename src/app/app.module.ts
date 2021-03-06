import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaperComponent } from './paper/paper.component';
import { PaperListComponent } from './paper-list/paper-list.component';
import { StudentNavComponent } from './student-nav/student-nav.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';

import { DataserviceService } from './dataservice.service';
import { SharedserviceService } from './services/sharedservice.service';
import { CountdownModule } from 'ngx-countdown';
import { LoadingSpinComponent } from './ui/loading-spin/loading-spin.component';
import { ReviewComponent } from './review/review.component';

import { ChartsModule } from 'ng2-charts';


import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { RegisterPageComponent } from './register-page/register-page.component';
import { AdminPaperComponent } from './admin-paper/admin-paper.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { ViewPaperComponent } from './view-paper/view-paper.component';


import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PaperComponent,
    PaperListComponent,
    StudentNavComponent,
    LoginComponent,
    LoadingSpinComponent,
    ReviewComponent,
    AdminDashboardComponent,
    RegisterPageComponent,
    AdminPaperComponent,
    SubjectListComponent,
    ViewPaperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CountdownModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: [DataserviceService, SharedserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
