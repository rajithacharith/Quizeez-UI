import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  password: string;
  email: string;
  accessToken: string;
  userID: string ;
  constructor( private dataService: DataserviceService, private router: Router) { }

  ngOnInit() {
  }



  submit() {

    sessionStorage.setItem('email', this.email);

    this.dataService.userLogin(this.email, this.password).subscribe((data: any) => {
      this.accessToken = data.id;
      this.userID = data.userId;

      sessionStorage.setItem('accessToken', this.accessToken);
      sessionStorage.setItem('userID', this.userID);
      console.log(sessionStorage.getItem('userID'));
      this.router.navigateByUrl('/');
    });

  }

}
