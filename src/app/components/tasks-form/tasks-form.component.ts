import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.class';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css']
})
export class TasksFormComponent implements OnInit {

  task: Task = {
    id: 0,
    title: '',
    completed: false
  }
  @Output('addTask') addTask = new EventEmitter<Task>()
  constructor() { }

  ngOnInit(): void {
    
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.addTask.emit(this.task);
    this.task.title = ''
  }


}
