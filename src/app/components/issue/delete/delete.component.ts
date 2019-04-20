import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IssueService } from 'src/app/issue.service';
import { Issue } from 'src/app/issue.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  issueId: String = '';

  constructor(private issueService: IssueService, public dialogRef: MatDialogRef<DeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: Issue) { }

  ngOnInit() {
    this.issueId = this.data.id;
  }

  onDelete() {
    this.issueService.deleteIssue(this.issueId).subscribe(() => {
      this.onClose();
    });
  }

  onClose() {
    this.dialogRef.close();
  }

}
