import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { IssueService } from 'src/app/issue.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  emailForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private issueService: IssueService) {

  }


  ngOnInit() {
    this.emailForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: '',
      phone: '',
      message: ['', [Validators.required]]
    });
  }

  sendEmail(name, company, email, phone, message) {
    console.log("hiiii");
    this.issueService.sendEmail(name, company, email, phone, message).subscribe((data) => {
      console.log(data);
    });
  }

}
