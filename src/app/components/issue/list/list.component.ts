import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig
} from '@angular/material';

import { Issue } from '../../../issue.model';
import { IssueService } from '../../../issue.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  issues: Issue[];
  displayedColumns: string[] = [
    'title',
    'responsible',
    'severity',
    'status',
    'actions'
  ];
  listIssues: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort; //import matsort function
  @ViewChild(MatPaginator) paginator: MatPaginator; //import matpaginator function
  searchKey: String = '';

  constructor(
    private issueService: IssueService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService.getIssues().subscribe((data: Issue[]) => {
      this.issues = data["data"]; // without pagination
      this.listIssues = new MatTableDataSource(data["data"]); //with pagination
      this.listIssues.sort = this.sort; //calling matsort to list issue
      this.listIssues.paginator = this.paginator; //calling matpaginator to list issue
      // tslint:disable-next-line:no-shadowed-variable
      this.listIssues.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return (
            ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1
          );
        });
      };
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
      console.log('This dialog was closed');
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
