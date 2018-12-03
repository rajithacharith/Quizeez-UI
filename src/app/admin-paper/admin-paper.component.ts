import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from "../services/sharedservice.service";
import { ArrangedQuestionsFormat } from "../arranged-questions-format";
import { DataserviceService } from "../dataservice.service";
@Component({
  selector: 'app-admin-paper',
  templateUrl: './admin-paper.component.html',
  styleUrls: ['./admin-paper.component.css']
})





export class AdminPaperComponent implements OnInit,ArrangedQuestionsFormat {

  public paperID:any;
  public noOfQuestions : number ;
  public message : any;
  public i : number ;
  public questionSet = {};
  public question0 : any;
  
  public questionArray = [] ;
  public answer0Array = [];
  public answer1Array = [];
  public answer2Array = [];
  public answer3Array = [];
  public correctAnswerArray = [];

  public arrangedQuestion = {} as ArrangedQuestionsFormat;
  public setOfArrangedQuestions = {} ;
  testArr : string [] = [];
 
  constructor(private shared : SharedserviceService, private dataService : DataserviceService) {  }
  
  ngOnInit() {
    console.log(this.arrangedQuestion);
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

    console.log("clicked");
    
    for(let i=0; i<this.questionArray.length; i++){
      this.arrangedQuestion.paperID = this.paperID;
      this.arrangedQuestion.questionID= i;
      this.arrangedQuestion.question= this.questionArray[i];
      this.arrangedQuestion.correctAnswer=parseInt( this.correctAnswerArray[i]);
      
      this.testArr.push(this.answer0Array[i]);
      this.testArr.push(this.answer1Array[i]);
      this.testArr.push(this.answer2Array[i]);
      this.testArr.push(this.answer3Array[i]);
      this.arrangedQuestion.answers=this.testArr;

      this.dataService.addQuestionAsObject(this.arrangedQuestion).subscribe(()=>{
        console.log("added the question");
        console.log(this.arrangedQuestion);
      });
      
      this.setOfArrangedQuestions[i]=this.arrangedQuestion;
      this.testArr=[];
      this.arrangedQuestion={} as ArrangedQuestionsFormat;
    }
    

    console.log(this.setOfArrangedQuestions);
  }
 

}
