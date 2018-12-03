import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from "@angular/router";
import { SharedserviceService } from "../services/sharedservice.service";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public paperSet: any;
  public stream: string ;
  public year: number ;
  public subject: string ;
  public newPaperID: number;
  public maxPaperID: number;
  public questionNo: number;
  public questionSet: {};
  public Question: string;
  public Answer0: string;
  public Answer1: string;
  public Answer2: string;
  public Answer3: string;
  public correctAnswer: number;
  public time: string;

  public addQuestionVisibility : boolean;
  public noOfQues : string ;
  public noOfQuesArray: number;
  public i : number = 0;
  public newSubject :string ; 
  public subjectStream:string ;
  public availableSubjects: any = {} ;
  public subjectsOL : string[] =[];
  public subjectsAL : string [] = [];
  public shownSubjects: any ;

  /* Details for paper creation */

  public createPaperStream : string ;
  public createPaperSubject : string ;
  public createPaperLanguage : string ;
  public createPaperYear : number;
  public createPaperTime : number;

  constructor( private dataService: DataserviceService,private router : Router,private shared : SharedserviceService ) {
    this.addQuestionVisibility = false;
    this.subject="";
    this.noOfQuesArray=0;


    this.questionNo = 0;
    this.questionSet = {};
    let maxPaperID = 0;
    this.dataService.getPapers().subscribe((paper) => {
      console.log(paper);
      this.paperSet = paper;
      this.paperSet.forEach(element => {
        if (element.paperID > maxPaperID) {
          console.log(element.paperID);
          maxPaperID = element.paperID;
        } else {}
      });
      this.newPaperID = maxPaperID + 1;
      console.log(this.newPaperID);
    });

   }

  ngOnInit() {

    this.dataService.getAllSubjects().subscribe((returnedSubjects)=>{
      this.availableSubjects = returnedSubjects;
      console.log(this.availableSubjects);
      this.dividePapersByStream();
    });

  }

  dividePapersByStream(){
    console.log(this.availableSubjects);
    for(let subject of this.availableSubjects){
      console.log("ran");
      if(subject.stream === "O/L"){
        this.subjectsOL.push(subject.subjectName);
      }
      if(subject.stream === "A/L"){
        this.subjectsAL.push(subject.subjectName);
      }
    }
    this.shownSubjects = this.subjectsAL;
    console.log('shown object is')
    console.log(this.shownSubjects);
    console.log("ol al")
    console.log(this.subjectsOL,this.subjectsAL);
  }

  createPaperSubmitHandler(){
    this.noOfQuesArray= parseInt(this.noOfQues);
    console.log(this.noOfQuesArray);

    const paperDetails = {
      paperID : this.newPaperID,
      noOfQuestions: this.noOfQuesArray
    }
    this.shared.changeMessage(paperDetails);
    this.addPaper();
    this.router.navigateByUrl('/add-questions');
  }

  selectedStreamEventHandler($event){
    if($event.target.value === "O/L"){
      this.shownSubjects=this.subjectsOL;
    }
    if($event.target.value === "A/L"){
      this.shownSubjects=this.subjectsAL;
    }
    console.log(this.shownSubjects);
  }
  /*
  addQuestion(event: any, question: string, q: any) {
      console.log(event, question, q);
    
  }
*/
  

  addPaper() {
    const paper = {
      'stream' : this.createPaperStream,
      'paperID': this.newPaperID,
      'year': this.createPaperYear,
      'subject': this.createPaperSubject,
      'timeDuration': this.createPaperTime,
      'language' : this.createPaperLanguage
    };
    console.log(paper);
    this.dataService.addPaper(paper).subscribe(()=>{
      console.log("data added");
    });
  }

  changeMessage(message: any){
    this.shared.changeMessage(message);
    console.log(message);
  }

  addNewSubject(){
    this.dataService.addSubject(this.newSubject,this.subjectStream).subscribe(()=>{
      console.log("added the subject");
      console.log(this.newSubject);
      this.newSubject="";
    });
  }

}
