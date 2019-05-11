import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from 'src/app/services/shared/issue.service';
import { ProjectService } from 'src/app/services/shared/project.service';
import { UserService } from 'src/app/services/shared/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {
  id: number;
  sub: any;
  issueDetailForm: FormGroup;

  // Options parameters for dropdown input
  AssigneeOptions = [];
  projectOptions = [];
  issueDetails = [];
  issueStatusesOptions = [];

  // Datatable properties
  datatable = [];
  columns = [];
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private projectService: ProjectService,
              private formBuilder: FormBuilder,
              private issueService: IssueService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params[ 'id' ];
      this.loadIssueDetails();
    });
    this.columns = [
      { prop: 'id', name: 'No' },
      { prop: 'description', name: 'Description' },
      // { prop: 'details', name: 'Details' },
      { prop: 'issueStatus', name: 'issue Status' },
      { prop: 'assignee.username', name: 'Username' },
      { prop: 'issue.project.projectName', name: 'Project Name' },
      { prop: 'issue.project.projectCode', name: 'Project Code' },
    ];
    this.loadProject();
    this.loadAssignees();
    this.loadIssueStatues();
  }

  createIssueDetailFormGroup(response) {
    return this.formBuilder.group({
      id: response['id'],
      description: response['description'],
      details: response['details'],
      date: this.fromJsonDate(response['date']),
      issueStatus: response['issueStatus'],
      assignee_id: response['assignee']? response['assignee']['id'] : '',
      project_id: response['project'] ? response['project']['id'] : '',
      project_manager: response['project'] && response['project']['manager'] ? response['project']['manager']['username']: '',
    });
  }

  fromJsonDate(jDate): string {
    const bDate: Date = new Date(jDate);
    return bDate.toISOString().substring(0, 10);
  }



  loadIssueStatues() {
    this.issueService.getAllIssueStatuses().subscribe(res => {
      this.issueStatusesOptions = res;
    });
  }
  loadProject() {
    this.projectService.getAll().subscribe(res => {
      this.projectOptions = res;
    });
  }
  loadAssignees() {
    this.userService.getAll().subscribe(res => {
      this.AssigneeOptions = res;
    });
  }
  loadIssueDetails() {
    this.issueService.getByIdWithDetails(this.id).subscribe(res => {
      this.issueDetails = res;
      this.issueDetailForm = this.createIssueDetailFormGroup(res);
      this.datatable = res['issueHistories']
    }
    );
  }
}