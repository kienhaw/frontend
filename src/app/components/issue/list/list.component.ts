import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
  MatPaginatorIntl,
  MatSnackBar
} from '@angular/material';

import { Issue } from '../../../issue.model';
import { IssueService } from '../../../issue.service';
import { DeleteComponent } from '../delete/delete.component';
import { AuthService } from 'src/app/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  issues: Issue[];
  displayedColumns: string[] = [
    'no.',
    'title',
    'responsible',
    'severity',
    'status',
    'actions'
  ];
  listIssues: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort; //import matsort function
  @ViewChild(MatPaginator) paginator: MatPaginator; //import matpaginator function
  @ViewChild(MatPaginatorIntl) pagInt: MatPaginatorIntl;
  searchKey: String = '';

  constructor(
    private issueService: IssueService,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // this.paginator.pageIndex = 1;
    // this.paginator.pageSize = 10;
    // this.auth.getLogin();
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService.getIssues().subscribe((data: any) => {
      this.issues = data["data"]; // without pagination
      this.listIssues = new MatTableDataSource(data["data"]); //with pagination
      this.listIssues.sort = this.sort; //calling matsort to list issue
      this.listIssues.paginator = this.paginator; //calling matpaginator to list issue
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.snackBar.open('Session expired.', 'OK', {
            duration: 3000
          });
          this.auth.setLoggedIn(false);
          this.router.navigate(["/login"]);
        }
      }
    });
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  onDelete(id) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '50%',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchIssues();
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listIssues.filter = this.searchKey.trim().toLowerCase();
  }

}
