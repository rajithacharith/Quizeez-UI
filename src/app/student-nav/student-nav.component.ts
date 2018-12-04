import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-nav',
  templateUrl: './student-nav.component.html',
  styleUrls: ['./student-nav.component.css']
})
export class StudentNavComponent implements OnInit {

  accessToken: string ;

  constructor(private dataService: DataserviceService, private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.accessToken = sessionStorage.getItem('accessToken')
    this.dataService.userLogout(this.accessToken);
    localStorage.clear();
    sessionStorage.clear();
    console.log('Session cleared');
    this.router.navigateByUrl('/login');

  }

}
