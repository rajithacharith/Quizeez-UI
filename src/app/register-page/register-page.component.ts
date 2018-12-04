import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  public email: string;
  public password: string;
  public Vpassword: string;
  public notVarified: boolean;

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordValidation: ['', [Validators.required]]
  });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    } else if (this.registerForm.value.password === this.registerForm.value.passwordValidation) {
      console.log(JSON.stringify(this.registerForm.value));
      this.dataService.register(this.registerForm.value.email,this.registerForm.value.password).subscribe((data) => {
          alert('Sussecfully Registered!');
      });
      this.router.navigate(['/login']);

  } else {
    this.notVarified = true;
  }
  }

}
