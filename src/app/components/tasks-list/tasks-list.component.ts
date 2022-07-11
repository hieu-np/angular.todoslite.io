import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.class';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  @Input('tasks') tasks: Task[] = [];
  @Output('setStatus') setStatus = new EventEmitter<Task>();
  @Output('delete') delete = new EventEmitter<number>();
  @Output('update') update = new EventEmitter<Task>();
  
  public status: number = 0;
  public subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(
      (data: Params) => {
        this.status = data['completed'] 
        ? (data['completed'] == 'true' 
          ? 1 
          : -1) 
        : 0        
      }
    )
  }

  constructor( public activatedRoute: ActivatedRoute ) { }
  
}
