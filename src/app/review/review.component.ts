import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from '../services/sharedservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  questionResults: boolean []  ;
  year: number ;
  stream: string ;
  subject: string ;
  questionSet: any;
  message: any;
  paperID: any;
  constructor( private shared: SharedserviceService, private router: Router) { }

  ngOnInit() {
    this.shared.currentMessage.subscribe(message => {
      this.message = message;
      console.log('message is');
      console.log(message);
    });

    this.questionResults = this.message.questionResults;
    this.questionSet = this.message.questionSet;
    this.stream = this.message.stream;
    this.subject = this.message.subject;
    this.year = this.message.year;
    this.paperID = this.message.paperID;


    console.log(this.questionSet[0].answers[this.questionSet[0].correctAnswer]);
  }
  submitAnswers() {
    this.router.navigateByUrl('/');
  }
}
