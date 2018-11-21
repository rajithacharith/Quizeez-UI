import { Component, OnInit } from '@angular/core';
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
  
  constructor( private dataService : DataserviceService) { 

    

    this.dataService.getPapers().subscribe((paper) => {
      console.log(paper);
      this.paperSet = paper;
    });
    /*
    this.dataService.getQuestions().subscribe((question) => {
      console.log(question);
    });

    */


  }

  
    selectedStreamEventHandler(event : any,selectedStream : any){
      this.selectedStream=event.target.value;

      this.dataService.filterPaperByStream(this.selectedStream).subscribe((paper)=>{
        this.subjectSet= paper;
      });

    }



  ngOnInit() {


    selectedSubjectEventHandler(event : any,selectedStream : string){
      this.selectedSubject=event.target.value;

      this.dataService.filterPaperBySubject(this.selectedSubject).subscribe((paper)=>{
        this.yearSet= paper;
      });
    }

    selectedYearEventHandler(event : any){
      this.selectedYear=event.target.value;

      this.dataService.filterPaperByYear(this.selectedYear).subscribe((paper)=>{
        this.yearSet= paper;
      });
    }
    /*
    selectedLessonEventHandler(event : any){
      this.selectedLesson=event.target.value;
      console.log(this.selectedLesson);

      this.dataService.filterPaperByLesson(this.selectedLesson).subscribe((paper)=>{
        this.paperSet= paper;
      });
    }
    */

  ngOnInit() {
  }
  setStream(message:string){
    this.shared.setStream(message);
  }
  setYear(message:number){
    this.shared.setYear(message);
  }
  setSubject(message:string){
    this.shared.setSubject(message);
  }
  setLession(message:string){
    this.shared.setLesson(message);
  }

}
