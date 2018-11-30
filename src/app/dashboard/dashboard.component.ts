import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataserviceService } from '../dataservice.service';
import { SharedserviceService } from '../services/sharedservice.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {


  paperSet : any;
  subjectSet: any;
  yearSet : any;
  LessonSet : any;

  selectedStream : string ;
  selectedSubject : string ;
  selectedYear : number ;
  selectedLesson : string ;
  message:any;

  subjectDisabled : boolean = true;
  yearDisabled : boolean = true ; 
  searchButtonDisable : boolean = true;
  constructor( private dataService : DataserviceService, private shared: SharedserviceService,private router:Router) {



    this.dataService.getPapers().subscribe((paper) => {
      
      console.log(paper);
      this.paperSet = paper;
      
    });
    


  }


    selectedStreamEventHandler(event : any,selectedStream : any){
      this.selectedStream=event.target.value;
      console.log((this.selectedStream));
      this.dataService.filterPaperByStream(this.selectedStream).subscribe((paper)=>{
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
        console.log("year enabled");
        
      });
    }

    selectedYearEventHandler(event: any, selectedYear: number) {
      this.selectedYear = event.target.value;

      this.dataService.filterPaperByYear(selectedYear).subscribe((paper) => {
        this.changeMessage(this.yearSet);
        this.searchButtonDisable=false;
      });
    }
    

  ngOnInit() {
    this.shared.currentMessage.subscribe(message => {
      this.message = message;
      
    });
  }
  
  changeMessage(message: any){
    this.shared.changeMessage(message);
    console.log(message);
  }
  submitHandler() {
    this.router.navigateByUrl('/paper');
  }
}
