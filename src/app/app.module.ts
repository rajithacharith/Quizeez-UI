import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaperComponent } from './paper/paper.component';
import { PaperListComponent } from './paper-list/paper-list.component';
import { StudentNavComponent } from './student-nav/student-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PaperComponent,
    PaperListComponent,
    StudentNavComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
