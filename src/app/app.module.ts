import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaperComponent } from './paper/paper.component';
import { PaperListComponent } from './paper-list/paper-list.component';
import { StudentNavComponent } from './student-nav/student-nav.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';

import { DataserviceService } from "./dataservice.service";
import { SharedserviceService } from './services/sharedservice.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PaperComponent,
    PaperListComponent,
    StudentNavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule

  ],
  providers: [DataserviceService, SharedserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
