import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

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
  public questionSet: any;
  public Question: string;
  public Answer0: string;
  public Answer1: string;
  public Answer2: string;
  public Answer3: string;
  public correctAnswer: number;
  public time: string;

  constructor( private dataService: DataserviceService ) {
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

}
