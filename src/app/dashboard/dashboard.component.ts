import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { DataserviceService } from '../dataservice.service';
import { SharedserviceService } from '../services/sharedservice.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  studentID : any;
  paperSet : any;
  subjectSet: any;
  yearSet : any;
  LanguageSet : any;

  selectedStream : string ;
  selectedLanguage: string ;
  selectedSubject : string ;
  selectedYear : number ;

  message:any;


  LanguageDisabled : boolean = true ;
  subjectDisabled : boolean = true;
  yearDisabled : boolean = true ;
  searchButtonDisable : boolean = true;
  constructor( private dataService : DataserviceService, private shared: SharedserviceService,private router:Router) {
    console.log(sessionStorage.getItem("userID"));

  }


    selectedStreamEventHandler(event : any){
      this.selectedStream=event.target.value;
      console.log((this.selectedStream));
      this.LanguageDisabled = false;

    }

    selectedLanguageEventHandler(event : any){
      this.selectedLanguage=event.target.value;
      console.log((this.selectedLanguage));
      this.dataService.filterPaperByStreamAndLanguage(this.selectedStream,this.selectedLanguage).subscribe((paper)=>{
        this.subjectSet= paper;
        this.subjectDisabled = false;
        console.log("subject enabled");
      });

    }

    selectedSubjectEventHandler(event : any, selectedSubject : string){
      this.selectedSubject=event.target.value;
      this.dataService.filterPaperBySubject(selectedSubject).subscribe((paper)=>{
        this.yearSet= paper;
        this.yearDisabled = false;
        console.log('year enabled');

      });
    }

    selectedYearEventHandler(event: any) {
      this.selectedYear = event.target.value;

      this.dataService.filterPaperByYear(this.selectedYear).subscribe((paper) => {
        this.changeMessage(this.yearSet);
        this.searchButtonDisable=false;
      });
    }


  ngOnInit() {
    localStorage.clear();
    console.log(sessionStorage.getItem("userID"));
    this.shared.currentMessage.subscribe(message => {
      this.message = message;
    });
  }

  changeMessage(message: any){
    this.shared.changeMessage(message);
    console.log(message);
  }
  submitHandler() {
    console.log(this.yearSet);
    this.router.navigateByUrl('/paper');
  }
}
