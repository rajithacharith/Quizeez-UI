import { Component, OnInit, ViewChild, AfterViewInit , Inject} from '@angular/core';
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
  test = [];
  years = [];
  studentMarks = [];
  subjects  = [];
  objSubject : any;
  arrName : string;
  chartDetails = {};
  subjectsMarks : any;
  public paperCount:number;
  public questionCount: number;
  constructor( private dataService : DataserviceService, private shared: SharedserviceService,private router:Router) {
    console.log(sessionStorage.getItem("userID"));



    this.dataService.getPapers().subscribe((paper) => {
      
      console.log(paper);
      this.paperSet = paper;
      
    });
    
    //  this.dataService.getChartData(1).subscribe((item) => {
    //   this.chartData = item;
    //   //console.log('arr',this.chartData);
      
    //   for(var i = 0;i<this.chartData.length;i++){
        
    //     this.studentMarks.push(this.chartData[i].marks);
    //     this.years.push(this.chartData[i].year)
    //   }
    //   //console.log("hvhj",this.studentMarks);
    // }); 
    this.dataService.getSubjects().subscribe((item) => {
      //console.log('test');
      //this.chartDetails = {};
      this.objSubject = item;
      //console.log('obj subject',this.objSubject);
      for(let i = 0;i<this.objSubject.length;i++){
        //console.log(this.objSubject[i].subjectName);
        this.subjects.push(this.objSubject[i].subjectName);
      }

      //console.log("subjects",this.subjects,this.subjects.length);
    
      for(let i = 0;i<this.subjects.length;i++){
        
        
        this.dataService.getMarksFilterBySubjectAndStudent(this.subjects[i],1).subscribe((item) => {
          
          this.subjectsMarks = item;
          
          for(let j = 0;j<this.subjectsMarks.length;j++){
            
            this.studentMarks.push(this.subjectsMarks[j].marks);
            this.years.push(this.subjectsMarks[j].year);
          }
          this.years.sort();
          console.log(this.subjects[i],this.studentMarks);
          this.chartDetails[this.subjects[i]] = this.studentMarks;
          
          //console.log("chartDetails",this.chartDetails)
          const obj = {
            label : this.subjects[i],
            data : this.studentMarks,
            fill : true,
            lineTension: 0.2,
            borderColor:"blue",
            borderWidth:1
          }
          console.log(obj);
          this.test.push(obj);
          console.log("years",this.years);
          this.lineChart = new Chart('lineChart',{
            type: 'line',
            data: {
              labels: this.years,
              datasets: [obj],
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
          //this.lineChart.data = {datasets: this.test}
          //this.lineChart.data.datasets = this.test;
          //this.generateDatasets(this.chartDetails);
          //console.log("linechart",this.lineChart.data.datasets[0])
          this.studentMarks = [];
          this.years = [];
          console.log("test",this.test.length)
          
      });
      
      //console.log("haha",this.chartDetails);
      
     }
     //console.log(this.chartDetails["Physics"]);
     
    
    });
    console.log("years",this.years);
    
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
      //this.drawChart();
    }

    /* createArray(arr){
      for(var i = 0;i<arr.length;i++) { 
          this.chartDetails[arr[i]] = [];
      }
      

      
       console.log("chatdetails",this.chartDetails);
      this.chartDetails["Science"].push("afvasfs");
      console.log("chatdetails",this.chartDetails); 
    } */




    selectedSubjectEventHandler(event : any, selectedSubject : string){
      this.selectedSubject=event.target.value;
      this.dataService.filterPaperBySubject(selectedSubject).subscribe((paper)=>{
        this.yearSet= paper;
        this.yearDisabled = false;
        console.log('year enabled');

      });
      
      //this.addData(this.lineChart,[2020,2021],[14,56]);
    }

    selectedYearEventHandler(event: any) {
      this.selectedYear = event.target.value;

      this.dataService.filterPaperByYear(this.selectedYear).subscribe((paper) => {
        this.changeMessage(this.yearSet);
        this.searchButtonDisable=false;
      });
    }
    

    /*
    selectedLessonEventHandler(event : any){
      this.selectedLesson=event.target.value;
      console.log(this.selectedLesson);

    }
  
   
  // generateDatasets(chartDetails){
  //   //console.log("chsrt",chartDetails);
  //   for(let i = 0;i<this.subjects.length;i++){
  //     console.log("marked3",chartDetails);
        
  //       //console.log("marked2",chartDetails)   
  //   //chart.data.datasets.push(obj);
  //   }
  // }
  // drawChart(){
    
  //   console.log("fuck you ng")
    
  // }
//   addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets[0].data = data;
    
//     chart.update();
// }

  ngOnInit() {
    this.getCount();
    localStorage.clear();
    console.log(sessionStorage.getItem("userID"));
    this.shared.currentMessage.subscribe(message => {
      this.message = message;
    });
    // if(this.studentMarks.length!=0){
    //   console.log("data loaded")
    //   console.log(this.studentMarks);
    //   this.lineChart.update();
    //   this.drawChart();
    // }
    // else{
    //   console.log("data not loaded")
    // } 
    
    //this.drawChart(); 
  }
  
  /* ngAfterViewInit(){
    console.log("data not loading")
    console.log("sdsd",this.studentMarks);
    this.drawChart();
  } */
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
    console.log(this.yearSet);
    this.router.navigateByUrl('/paper');
  }

  getCount(){
    this.dataService.getPaperCount().subscribe((data)=>{
      console.log(data);
      this.paperCount = data.count;
    });

    this.dataService.getQuestionCount().subscribe((data)=>{
      this.questionCount = data.count;
    });


    
  }
}
