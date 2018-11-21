import { Component, OnInit } from '@angular/core';
import { DataserviceService } from "../dataservice.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public paperSet : any;
  selectedStream : string ;
  selectedSubject : string ;
  selectedYear : number ;
  selectedLesson : string ;
  
  constructor( private dataService : DataserviceService) { 

    
    
    this.dataService.getPapers().subscribe((paper) => {
      console.log(paper);
      this.paperSet = paper;
    });

    this.dataService.getQuestions().subscribe((question) => {
      console.log(question);
    });
    

  }

    filterByStream(){
      return this.paperSet.filter((item) => {
        return item.stream=="A/L";
      });
    }
  
    selectedStreamEventHandler(event : any){
      this.selectedStream=event.target.value;
      console.log(this.selectedStream);
    }

    selectedSubjectEventHandler(event : any){
      this.selectedSubject=event.target.value;
      console.log(this.selectedSubject);
    }

    selectedYearEventHandler(event : any){
      this.selectedYear=event.target.value;
      console.log(this.selectedYear);
    }
    selectedLessonEventHandler(event : any){
      this.selectedLesson=event.target.value;
      console.log(this.selectedLesson);
    }

  ngOnInit() {
    console.log(this.selectedStream);
  }

}
