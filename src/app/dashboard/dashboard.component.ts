import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataserviceService } from '../dataservice.service';
import { SharedserviceService } from '../services/sharedservice.service';
import { Chart } from 'chart.js';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  lineChart: any;
  public chartData: any;


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

  years = [];
  studentMarks = [];
  constructor( private dataService : DataserviceService, private shared: SharedserviceService,private router:Router) {



    this.dataService.getPapers().subscribe((paper) => {
      
      console.log(paper);
      this.paperSet = paper;
      
    });
    this.dataService.getChartData().subscribe((item) => {
      this.chartData = item;
      console.log('arr',this.chartData);
      for(var i = 0;i<this.chartData.length;i++){
        
        this.studentMarks.push(this.chartData[i].marks);
        this.years.push(this.chartData[i].year)
      }
      console.log("hvhj",this.studentMarks);
    });
    

  }


    selectedStreamEventHandler(event : any,selectedStream : any){
      this.selectedStream=event.target.value;
      console.log((this.selectedStream));
      this.dataService.filterPaperByStream(this.selectedStream).subscribe((paper)=>{
        this.subjectSet= paper;
        this.subjectDisabled = false;
        console.log("sibject enabled");
      });

    }






    selectedSubjectEventHandler(event : any, selectedSubject : string){
      this.selectedSubject=event.target.value;
      // this.setSubject(selectedSubject);
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
    this.shared.currentMessage.subscribe(message => {
      this.message = message;
      
    });
    
    this.lineChart = new Chart('lineChart',{
      type: 'line',
      data: {
        labels: this.years,
        datasets: [{
          label: 'Number of items',
          data: this.studentMarks,
          fill: true,
          lineTension: 0.2,
          borderColor:"blue",
          borderWidth:1
        }]
      },
      options: {
        title:{
          text:"Line Chart",
          display:true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    console.log("fuck you ng")
  }
  /* setStream(message: string) {
    this.shared.setStream(message);
    console.log(message);
  }
  setYear(message: number) {
    this.shared.setYear(message);
    console.log(message);
  }
  setSubject(message: string) {
    this.shared.setSubject(message);
    console.log(message);
  }
  setLession(message: string) {
    this.shared.setLesson(message);
    console.log(message);
  } */
  changeMessage(message: any){
    this.shared.changeMessage(message);
    console.log(message);
  }
  submitHandler() {
    this.router.navigateByUrl('/paper');
  }
}
