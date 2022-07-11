import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.class';


@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styleUrls: ['./tasks-item.component.css']
})
export class TasksItemComponent implements OnInit {

  @Input('task') task: Task = {
    id: 0,
    title: '',
    completed: false
  };
  @Output('setStatus') setStatus = new EventEmitter<any>();
  @Output('delete') delete = new EventEmitter<any>();
  @Output('update') update = new EventEmitter<any>();

  isEditing: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  onEditing() {
    this.isEditing = true;
  }

  onStopEditing() {
    this.isEditing = false;
  }



}
