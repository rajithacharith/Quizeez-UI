import { Component, OnInit } from '@angular/core';

import { DataserviceService } from "../dataservice.service";
import { Router } from "@angular/router";
import { SharedserviceService } from "../services/sharedservice.service";


@Component({
  selector: 'app-paper-list',
  templateUrl: './paper-list.component.html',
  styleUrls: ['./paper-list.component.css']
})
export class PaperListComponent implements OnInit {


  public paperSet :any;
  constructor(private dataService : DataserviceService,private router : Router,private shared : SharedserviceService) { }


  ngOnInit() {

    this.dataService.getPapers().subscribe((paper) => {
      this.paperSet = paper;
    });
  }

  goHome() {
    this.router.navigateByUrl('/admin');
  }

  openPaper(event: any ){
    console.log(event.target.value);
    const message = {
      paperID : event.target.value
    }
    this.shared.changeMessage(message);
    this.router.navigateByUrl('/view-paper');
  }

  }




