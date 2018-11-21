import { Component, OnInit } from '@angular/core';
import { DataserviceService } from "../dataservice.service";
import { SharedserviceService } from '../services/sharedservice.service';
@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {
  message : string;
  public paperSet :any;
  public stream : string ;
  public year : number ;
  public subject : string ;

  public answers : any;
  public questionID : any;

  public paperID: number;
  public questionSet: any;
  public answerSet : any;
  selectedValue :string ;

  studentAnswers =  [] ;
  correctAnswerSet = [];

  constructor( private dataService : DataserviceService, private shared : SharedserviceService ) {

    this.stream = "A/L";
    this.year=2000;
    this.subject="Physics";
    this.paperID = 1;
    this.questionID = 101;

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
    this.dataService.getQuestionFilterByQuestionID(this.questionID).subscribe((ans)=>{
      this.answerSet = ans;
      console.log("answerset");
      console.log(this.answerSet);
    });

  }

  createCorrectAnsArr(){
    for(var i = 0;i<this.answerSet.length;i++){
      this.correctAnswerSet.push(this.answerSet[4]);
    }
    

  }
  radioChangeHandle(event : any,questionIndex:number,answerIndex : number){

    const answerObject = {
      questionNumber : questionIndex,
      answerNumber : answerIndex,
      answerValue : event.target.value
    }
    
    this.studentAnswers.push(answerObject);
    console.log(this.studentAnswers);

  }
  checkpaper(arr_correctans:string[]){
      
      //var arr_stuans:string[] = new Array("1","2","3","4");
      //var arr_correctans:string[] = new Array("1","3","4","4");
      var markedans = [];
      
      for(var i = 0;i<this.studentAnswers.length;i++) { 
        if(this.studentAnswers[i]==arr_correctans[i]){
            markedans.push(true);
        }
        else{
          markedans.push(false);
        }
          
        
          
      }  
      console.log(markedans);
      var mark = markedans
      return markedans;
  }

  
  ngOnInit() {
    this.stream = this.shared.getStream();
    this.year = this.shared.getYear();
    this.subject = this.shared.getSubject();
  }

}
