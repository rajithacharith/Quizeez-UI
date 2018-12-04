import { Component, OnInit } from '@angular/core';
import { DataserviceService } from "../dataservice.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  public subjectSet : any ;
  constructor(private dataService : DataserviceService,private router : Router) { }

  ngOnInit() {
    this.dataService.getAllSubjects().subscribe((subject)=>{
      this.subjectSet = subject;
    });
  }

  goHome(){
    this.router.navigateByUrl('/admin');
  }


}
