import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from "../services/sharedservice.service";
@Component({
  selector: 'app-admin-paper',
  templateUrl: './admin-paper.component.html',
  styleUrls: ['./admin-paper.component.css']
})
export class AdminPaperComponent implements OnInit {

  public paperID:any;
  public noOfQuestions : number ;
  public message : any;
  public i : number ;
  public questionSet = {};
  public question0 : any;
  constructor(private shared : SharedserviceService) { }

  ngOnInit() {
    this.shared.currentMessage.subscribe((message)=>{
      this.message = message;
    });
    this.paperID = this.message.paperID;
    this.noOfQuestions = this.message.noOfQuestions;

    for (this.i =0;this.i < this.noOfQuestions;this.i++){
      const question = {
        'paperID': this.paperID,
        'questionID': this.i,
        'question': '',
        'answers': [],
        'correctAnswer':''
      };
      this.questionSet[this.i] = question;
    }

    console.log(this.questionSet);
  }

  test(){
    for (this.i =0;this.i < this.noOfQuestions;this.i++){
      const question = {
        'paperID': this.paperID,
        'questionID': this.i,
        'question': `angular.element('question${this.i}').val());`,
        'answers': [`question${this.i}answer0`,`question${this.i}answer1`,`question${this.i}answer2`,`question${this.i}answer3`],
        'correctAnswer':'vghvhg'
      };
      console.log(question);
      this.questionSet[this.i] = question;
    }
    console.log("clicked");
    console.log(this.questionSet);
  }
 
 

  

}
