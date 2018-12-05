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

  studentID: any;
  paperSet: any;
  subjectSet: any;
  yearSet: any;
  LanguageSet: any;

  selectedStream: string ;
  selectedLanguage: string ;
  selectedSubject: string ;
  selectedYear: number ;

  message: any;


  LanguageDisabled = true ;
  subjectDisabled = true;
  yearDisabled = true ;
  searchButtonDisable = true;
  test = [];
  years = [];
  studentMarks = [];
  subjects  = [];
  objSubject: any;
  arrName: string;
  chartDetails = {};
  subjectsMarks: any;
  public paperCount: number;
  public questionCount: number;
  constructor( private dataService: DataserviceService, private shared: SharedserviceService, private router: Router) {
    console.log(sessionStorage.getItem('userID'));



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
      for (let i = 0; i < this.objSubject.length; i++) {
        //console.log(this.objSubject[i].subjectName);
        this.subjects.push(this.objSubject[i].subjectName);
      }

      const labels = new Set();
      const marks = {};
      let count = 0;
      for (let i = 0; i < this.subjects.length; i++) {


         this.dataService.getMarksFilterBySubjectAndStudent(this.subjects[i], 1).subscribe((res) => {

          const yearMarkMap = {};
          // @ts-ignore
           for (let j = 0; j < res.length; j++) {
            const temp = res[j];
            labels.add(temp.year);
            yearMarkMap[temp.year] = temp.marks;
          }
          marks[this.subjects[i]] = yearMarkMap;
           count++;
           if (count === this.subjects.length) {
             const x = Array.from(labels);
             x.sort();
             // done getting data make the chart now
             const lineChartData = [];
             for (const subject of this.subjects) {
               const subjectData = marks[subject];
               const values = [];
               let check = false;
               for (const year of x) {
                  if (subjectData[year] !== undefined) {
                    check = true;
                    values.push(subjectData[year]);
                  } else {
                    values.push(0);
                  }
               }
               if (check) {
                 const sData = {
                   data: values,
                   label: subject
                 };
                 lineChartData.push(sData);
               }
             }
             this.lineChart = new Chart('lineChart', {
               type: 'line',
               data: {
                 labels: x,
                 datasets: lineChartData,
               },
               options: {
                 title: {
                   text: 'Line Chart',
                   display: true
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
             console.log('labels:', labels);
             console.log('marks:', marks);
           }
      });

      //console.log("haha",this.chartDetails);

     }



    });
    console.log('years', this.years);

  }


    selectedStreamEventHandler(event: any) {
      this.selectedStream = event.target.value;
      console.log((this.selectedStream));
      this.LanguageDisabled = false;

    }

    selectedLanguageEventHandler(event: any) {
      this.selectedLanguage = event.target.value;
      console.log((this.selectedLanguage));
      this.dataService.filterPaperByStreamAndLanguage(this.selectedStream, this.selectedLanguage).subscribe((paper) => {
        this.subjectSet = paper;
        this.subjectDisabled = false;
        console.log('subject enabled');
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




    selectedSubjectEventHandler(event: any, selectedSubject: string) {
      this.selectedSubject = event.target.value;
      this.dataService.filterPaperBySubject(selectedSubject).subscribe((paper) => {
        this.yearSet = paper;
        this.yearDisabled = false;
        console.log('year enabled');
      });

      //this.addData(this.lineChart,[2020,2021],[14,56]);
    }

    selectedYearEventHandler(event: any) {
      this.selectedYear = event.target.value;
      this.dataService.filterPaperByYear(this.selectedYear).subscribe((paper) => {
        this.changeMessage(this.yearSet);
        this.searchButtonDisable = false;
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
  changeMessage(message: any) {
    this.shared.changeMessage(message);
    console.log(message);
  }
  submitHandler() {
    console.log(this.yearSet);
    this.router.navigateByUrl('/paper');
  }

  getCount() {
    this.dataService.getPaperCount().subscribe((data) => {
      console.log(data);
      // @ts-ignore
      this.paperCount = data.count;
    });

    this.dataService.getQuestionCount().subscribe((data) => {
      // @ts-ignore
      this.questionCount = data.count;
    });



  }

  ngOnInit(): void {
  }
}
