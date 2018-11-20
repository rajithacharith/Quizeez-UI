import { Component, OnInit } from '@angular/core';
import { DataserviceService } from "../dataservice.service";

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  public paperSet :any;
  public stream : string ;
  public year : number ;
  public subject : string ;

  public answers : any;

  public paperID: number;
  public questionSet: any;

  constructor( private dataService : DataserviceService) { 

    this.stream = "A/L";
    this.year=2000;
    this.subject="Physics";
    this.paperID = 1;

    this.dataService.filterPaperByAll(this.stream,this.subject,this.year).subscribe((paper) => {
      this.paperSet = paper;
      console.log(paper);
    });

    this.dataService.getAnswers().subscribe((answers) => {
      this.answers=answers;
    });

    this.dataService.getQuestionFilterByPaperID(this.paperID).subscribe((item)=>{
      this.questionSet = item;
      console.log("the questions are");
      console.log(this.questionSet);
    });

  }

  

  ngOnInit() {
  }

}
