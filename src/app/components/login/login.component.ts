import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private Auth: AuthService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  login(username, password) {
    this.Auth.getUserDetails(username, password).subscribe(data => {
      if (data.success == true) {
        this.snackBar.open('Login successfully', 'OK', {
          duration: 3000
        });
        this.router.navigate(['/list']);
        this.Auth.setLoggedIn(true);
        this.Auth.setToken(data.session["userId"]);
      } else {
        this.snackBar.open('Login failed', 'OK', {
          duration: 3000
        });
      }
    });
  }

}
