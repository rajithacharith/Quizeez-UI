import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaperComponent } from './paper/paper.component';
import { PaperListComponent } from './paper-list/paper-list.component';
import { StudentNavComponent } from './student-nav/student-nav.component';
import {AppRoutingModule} from './app-routing/app-routing.module';

import { DataserviceService } from "./dataservice.service";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PaperComponent,
    PaperListComponent,
    StudentNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule

  ],
  providers: [DataserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
