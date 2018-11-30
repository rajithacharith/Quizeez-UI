import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { SharedserviceService } from '../services/sharedservice.service';
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
  //public questionID : any;
  public studentID : number;
  public paperID: number;
  public questionSet: any;
  public answerSet : any;
  selectedValue :string ;

  
  correctAnswerSet = [];
  markedans = [];

  studentAnswers = {};
  message : any;
  constructor( private dataService : DataserviceService, private shared : SharedserviceService ) {


    
    this.studentID = 160292;
    //this.questionID = 101;

    this.dataService.getQuestionFilterByPaperID(this.paperID).subscribe((item)=>{
      this.questionSet = item;
      console.log("the questions are");
      console.log(this.questionSet);
    });
    

  }

  createCorrectAnsArr(){
    for(var i = 0;i<this.questionSet.length;i++){
      this.correctAnswerSet.push(this.questionSet[i].correctAnswer);
    }
    console.log("correct answers")
    console.log(this.correctAnswerSet)

  }
  
  radioChangeHandle(event : any,questionIndex:number,answerIndex : number){

    const answerObject = {
      questionNumber : questionIndex,
      answerNumber : answerIndex,
      answerValue : event.target.value
    }
    this.studentAnswers[answerObject.questionNumber] = answerObject.answerNumber;
    console.log('ans:',this.studentAnswers)
    
    

  }
  checkpaper(){
      
      this.createCorrectAnsArr();
      
      console.log("student answers")
      console.log(this.studentAnswers)
      for(var i = 0;i<this.correctAnswerSet.length;i++) { 
        if(this.studentAnswers[i]==this.correctAnswerSet[i]){
            this.markedans.push(true);
        }
        else{
          this.markedans.push(false);
        }
          
        
          
      }  
      console.log("marked answers")
      console.log(this.markedans);
      console.log(this.correctAnswerSet)
      var mark = this.markedans

      this.dataService.storeMarkedAnswers(this.studentID,this.paperID,this.markedans).subscribe(()=>{
        console.log("Item recorded!")
      });

      
      return this.markedans;
  }

  
  ngOnInit() {
    this.shared.currentMessage.subscribe(message => this.message = message);
    console.log(this.message[0].stream);
    this.stream = this.message[0].stream;
    this.year = this.message[0].year;
    this.subject = this.message[0].subject;
    this.paperID = this.message[0].paperID;

    console.log(this.stream , this.year, this.subject, this.paperID);

    this.dataService.filterPaperByAll(this.stream,this.subject,this.year).subscribe((paper) => {
      this.paperSet = paper;
      //console.log(paper);
    });

    this.dataService.getAnswers().subscribe((answers) => {
      this.answers=answers;
    });

    this.dataService.getQuestionFilterByPaperID(this.paperID).subscribe((item)=>{
      this.questionSet = item;
    });

  }

}
