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


  }

  createPaperSubmitHandler(){
    this.noOfQuesArray= parseInt(this.noOfQues);
    console.log(this.noOfQuesArray);

    const paperDetails = {
      paperID : this.newPaperID,
      noOfQuestions: this.noOfQuesArray
    }
    this.shared.changeMessage(paperDetails);
    this.router.navigateByUrl('/add-questions')
    
    

  }
  addQuestion(event: any, question: string, q: any) {
      console.log(event, question, q);
    /* const question = {
      'paperID': this.maxPaperID,
      'questionID': this.questionNo,
      'question': this.Question,
      'answers': [
        this.Answer0, this.Answer1, this.Answer2, this.Answer3
      ],
      'correctAnswer': this.correctAnswer
    };
    this.questionSet[this.questionNo] = question;
    this.questionNo += 1;
 */
  }

  submitQuestions() {
    this.questionSet.forEach(question => {
      this.dataService.addQuestionAsObject(question);
    });
  }

  addPaper() {
    const paper = {
      'paperID': this.newPaperID,
      'year': this.year,
      'subject': this.subject,
      'timeDuration': this.time
    };
    this.dataService.addPaper(paper);
    this.submitQuestions();
  }

  changeMessage(message: any){
    this.shared.changeMessage(message);
    console.log(message);
  }

}
