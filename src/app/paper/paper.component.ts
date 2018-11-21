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

  public paperID: number;
  public questionSet: any;

  selectedValue :string ;

  studentAnswers =  [] ;

  message : any;
  constructor( private dataService : DataserviceService, private shared : SharedserviceService ) {

    this.stream = "A/L";
    this.year=2000;
    this.subject="Physics";
    this.paperID = 1;



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
  checkpaper(arr_stuans:string[],arr_correctans:string[]){
      
      //var arr_stuans:string[] = new Array("1","2","3","4");
      //var arr_correctans:string[] = new Array("1","3","4","4");
      var markedans = [];
      
      for(var i = 0;i<arr_stuans.length;i++) { 
        if(arr_stuans[i]==arr_correctans[i]){
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
