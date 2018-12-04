import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paper-list',
  templateUrl: './paper-list.component.html',
  styleUrls: ['./paper-list.component.css']
})
export class PaperListComponent implements OnInit {

  public paperSet: any;
  constructor(private dataService: DataserviceService, private router: Router) { }

  ngOnInit() {

    this.dataService.getPapers().subscribe((paper) => {
      this.paperSet = paper;
    });
  }

  goHome() {
    this.router.navigateByUrl('/admin');
  }

}
