import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { SharedserviceService } from '../services/sharedservice.service';
import { CountdownModule } from 'ngx-countdown';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})



export class PaperComponent implements OnInit {
  private storageName = 'paperDetails';
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

  message : any;
  constructor( private dataService : DataserviceService, private shared : SharedserviceService ) {


  }


  radioChangeHandle(event : any,questionIndex:number,answerIndex : number){

    const answerObject = {
      questionNumber : questionIndex,
      answerNumber : answerIndex,
      answerValue : event.target.value
    }

    /*there is a big issue with loops here.can be resolved by removing duplicate elements after splicing */
    if(this.studentAnswers.length != 0){
        const result = this.studentAnswers.filter(studentAnswer => studentAnswer.questionNumber=questionIndex);
        console.log('Special log here answers');
        console.log(result);
      // for (let answer of this.studentAnswers){
      //   console.log(answer.questionNumber,answerObject.questionNumber);
      //   if(answer.questionNumber===answerObject.questionNumber){
      //     console.log("equal");
      //     this.studentAnswers.splice(this.studentAnswers.indexOf(answer),1);
      //     this.studentAnswers.push(answerObject);
      //     break;
      //   }
      //   else{
      //     console.log("not equal");
      //     //this.studentAnswers.push(answerObject);
      //     //break;
      //   }
      //   this.studentAnswers.push(answerObject);
      // }
    }

    else{
      this.studentAnswers.push(answerObject);
    }
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

  setPaperDetails(){
    let details = {
      'stream' : this.stream,
      'year': this.year ,
      'subject': this.subject,
      'paperID': this.paperID
    }
    localStorage.setItem(this.storageName, JSON.stringify(details));
  }

  finishPaper(){
    console.log('time out');
  }
  ngOnInit() {
    this.shared.currentMessage.subscribe(message => this.message = message);
    console.log(this.message[0].stream);
    this.stream = this.message[0].stream;
    this.year = this.message[0].year;
    this.subject = this.message[0].subject;
    this.paperID = this.message[0].paperID;
    // this above part should be avoided in order to maintain the local storage data even after the refresh
    // when we refresh the page these above lines are executed and all local variables become null.
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
    this.setPaperDetails();

  }

}
