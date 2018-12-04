import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from "../services/sharedservice.service";
import { DataserviceService } from "../dataservice.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-view-paper',
  templateUrl: './view-paper.component.html',
  styleUrls: ['./view-paper.component.css']
})


export class ViewPaperComponent implements OnInit {

  message : any ;
  questionSet : any; 
  year : number;
  stream : string;
  subject  : string ;
  paper : any;
  constructor(private shared : SharedserviceService,private dataService : DataserviceService,private router : Router) { }

  ngOnInit() {
    this.shared.currentMessage.subscribe((message) => {
      this.message = message;
      console.log(this.message.paperID);
    
    this.dataService.getQuestionFilterByPaperID(this.message.paperID).subscribe((question) => {
      this.questionSet = question;
      console.log('exec first',this.questionSet);

      this.dataService.getPaperByID(this.message.paperID).subscribe((paperObject)=>{
        console.log('paper is',paperObject);
        this.paper = paperObject;
        this.year = this.paper[0].year;
        this.stream = this.paper[0].stream;
        this.subject = this.paper[0].subject;
        console.log(this.year,this.stream,this.subject);
      });
    });
    
    
  });
    console.log('exec second',this.questionSet);
  }

  goHome(){
    this.router.navigateByUrl('/admin');
  }

}
