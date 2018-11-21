import { Component, OnInit } from '@angular/core';
import { DataserviceService } from "../dataservice.service";
import { SharedserviceService } from '../services/sharedservice.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public paperSet : any;
  public selectedStream : string ;
  constructor( private dataService : DataserviceService, private shared : SharedserviceService) {


    this.dataService.getPapers().subscribe((paper) => {
      console.log(paper);
      this.paperSet = paper;
    });

    this.dataService.getQuestions().subscribe((question) => {
      console.log(question);
    });


  }

    filterByStream(){
      return this.paperSet.filter((item) => {
        return item.stream=="A/L";
      });
    }


  ngOnInit() {

  }
  newMessage() {
    this.shared.changeMessage("Data given");
  }

}
