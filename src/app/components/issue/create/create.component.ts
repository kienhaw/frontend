import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { IssueService } from '../../../issue.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private issueService: IssueService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.createForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]), //use form control to control 2 thing, else use form builder style = ''
      responsible: '',
      description: '',
      severity: ''
    });
  }

  addIssue(title, responsible, description, severity) {
    this.snackBar.open('Issue created successfully', 'OK', {
      duration: 3000
    });
    this.issueService.addIssue(title, responsible, description, severity).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
