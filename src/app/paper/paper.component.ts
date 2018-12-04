import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { SharedserviceService } from '../services/sharedservice.service';

import { CountdownModule } from 'ngx-countdown';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})



export class PaperComponent implements OnInit {
  //private storageName = 'paperDetails';
  public paperSet: any;
  public stream: string ;
  public year: number ;
  public subject: string ;
  public time:number;

  public answers : any;
  public studentID : any;
  public paperID: number;
  public questionSet: any;
  public answerSet : any;
  selectedValue :string ;
  correctAnswerSet = [];
  markedans = [];
  showSpinner : boolean = true ;
  studentAnswers = {};
  message : any;
  constructor( private dataService : DataserviceService, private shared : SharedserviceService ,private router:Router) {

    this.studentID = sessionStorage.getItem("userID");


    this.dataService.getQuestionFilterByPaperID(this.paperID).subscribe((item)=>{
      this.questionSet = item;
      console.log("the questions are ::");
      console.log(this.questionSet);
    });



  }

  createCorrectAnsArr(){
    for(var i = 0;i<this.questionSet.length;i++){
      this.correctAnswerSet.push(this.questionSet[i].correctAnswer);
    }
    console.log("correct answers")
    console.log(this.correctAnswerSet);

  }

  radioChangeHandle(event: any, questionIndex: number, answerIndex: number) {

    const answerObject = {
      questionNumber : questionIndex,
      answerNumber : answerIndex,
      answerValue : event.target.value
    };

    this.studentAnswers[answerObject.questionNumber] = answerObject.answerNumber;

    console.log('ans:', this.studentAnswers);
    localStorage.setItem('answers', JSON.stringify(this.studentAnswers));

  }
  checkpaper() {

      this.createCorrectAnsArr();

      console.log('student answers');
      console.log(this.studentAnswers);
      for (let i = 0; i < this.correctAnswerSet.length; i++) {
        if (this.studentAnswers[i] == this.correctAnswerSet[i]){
            this.markedans.push(true);
        } else {
          this.markedans.push(false);
        }
      }
      console.log('marked answers');
      console.log(this.markedans);

      console.log(this.correctAnswerSet);
      let mark = this.markedans;


      this.dataService.storeMarkedAnswers(this.studentID,this.paperID,this.markedans).subscribe(()=>{
        console.log('Item recorded!')
      });


      const submitDetailsObject = {
        questionResults : this.markedans,
        questionSet : this.questionSet,
        year : this.year,
        stream : this.stream,
        subject : this.subject,
        studentID: this.studentID,
        PaperID: this.paperID
      };
      console.log(submitDetailsObject);
      this.changeMessage(submitDetailsObject);
      localStorage.clear();
      this.router.navigateByUrl('/review');

    }

  setPaperDetails() {
    const details = {
      'stream' : this.stream,
      'year': this.year ,
      'subject': this.subject,
      'paperID': this.paperID,
      'timeDuration' : this.time / 3600
    };
    localStorage.setItem('PaperDetails', JSON.stringify(details));
  }

  finishPaper() {
    console.log('time out');
    this.checkpaper();
  }

  changeMessage(message: any){
    this.shared.changeMessage(message);
    console.log(message);
  }

  ngOnInit() {

    if (!(localStorage.getItem('PaperDetails') === null)) {
      console.log('Entered if');
      console.log(localStorage.getItem('PaperDetails'));
      if (!(localStorage.getItem('answers') === null)){
        this.studentAnswers = JSON.parse(localStorage.getItem('answers'));
        console.log(this.studentAnswers);
      }
      const paperDetails = JSON.parse(localStorage.getItem('PaperDetails')) ;
      console.log(paperDetails);
      this.stream = paperDetails.stream;
      this.year = paperDetails.year;
      this.subject = paperDetails.subject;
      this.paperID = paperDetails.paperID;
      this.time = paperDetails.timeDuration * 3600;


      this.dataService.filterPaperByAll(this.stream,this.subject,this.year).subscribe((paper) => {
        this.paperSet = paper;
        this.showSpinner = false;
        console.log(paper);
      });


      this.dataService.getAnswers().subscribe((answers) => {
        this.answers = answers;
      });

      this.dataService.getQuestionFilterByPaperID(this.paperID).subscribe((question)=>{
        this.questionSet = question;
      });


    } else {
        this.shared.currentMessage.subscribe(message => {
          this.message = message;
        });
        console.log(this.message[0].stream);
        this.stream = this.message[0].stream;
        this.year = this.message[0].year;
        this.subject = this.message[0].subject;
        this.paperID = this.message[0].paperID;
        this.time = this.message[0].timeDuration * 3600;
        console.log(this.stream , this.year, this.subject, this.paperID);

        this.dataService.filterPaperByAll(this.stream,this.subject,this.year).subscribe((paper) => {
          this.paperSet = paper;
          this.showSpinner = false;
          console.log(paper);
        });

        this.dataService.getAnswers().subscribe((answers) => {
          this.answers = answers;
        });

        this.dataService.getQuestionFilterByPaperID(this.paperID).subscribe((question)=>{
          this.questionSet = question;
        });

        this.setPaperDetails();

      }
      console.log("time" , this.time);
    }






}
