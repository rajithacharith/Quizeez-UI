import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  result : boolean [] = [true,false,true,true,false,false,false,true];
  year : number =2000;
  stream : string = "A/L";
  subject : string = "Physics";

  constructor() { }
    
  ngOnInit() {
  }

}
