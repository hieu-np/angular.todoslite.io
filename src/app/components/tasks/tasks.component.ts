import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.class';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  subscriptionParams!: Subscription;
  tasks: Task[] = [];
  constructor(
    public taskService: TaskService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.taskService.getAll().subscribe(
      (tasksData: Task[]) => {
        // this.tasks = data;
        this.subscriptionParams = this.activatedRoute.params.subscribe(
          (data: Params) => {

            let status = data['completed'] 
            ? (data['completed'] == 'true' 
              ? 1 
              : -1) 
            : 0;
            
            this.tasks = tasksData.filter(
              dataFilter => {
                if(status == 1){
                  return dataFilter.completed == true
                }else if(status == -1){
                  return dataFilter.completed == false
                }else{
                  return dataFilter;
                }
              }
            )

          }
        )        
      },
      error => {
        console.log(error);
        
      }
    )
  }

  ngOnDestroy(): void {
      if(this.subscription){
        this.subscription.unsubscribe()
      }
  }

  addTask(e: Task){
    let task = new Task(e.title);
    this.subscription = this.taskService.addTask(task).subscribe(
      (data: Task) => {
        this.tasks.push(data)
      },
      (error) => {
        console.log(error); 
      }
    )
  }


  setStatus(e: Task){
    e.completed = !e.completed;
    this.subscription = this.taskService.updateTask(e).subscribe(
      (data: Task) => {
        // this.tasks.forEach((t, i) => {
        //   if(data.id == t.id){
        //     this.tasks[i] = data;
        //   }
        // })
        this.updateData(data);
      },
      error => {
        console.log(error);
      }
    )    
  }

  updateData(data: Task) {
    for(var i = 0; i < this.tasks.length; i++){
      if(this.tasks[i].id == data.id){
        this.tasks[i] = data;
        break;
      }
    }
  }

  onDelete(e: number) {
    this.subscription = this.taskService.deleteTask(e).subscribe(
      (data: Task) => {
        this.updateDataDelete(e);
      },
      error => {
        console.log(error);
        
      }
    )
  }

  updateDataDelete(id: number) {
    for(var i = 0; i < this.tasks.length; i++){
      if(this.tasks[i].id == id){
        this.tasks.splice(i, 1)
        break;
      }
    }
  }

  onUpdate(e: Task) {
    this.subscription = this.taskService.updateTask(e).subscribe(
      (data: Task) => {
        this.updateData(data);
      },
      error => {
        console.log(error);
      }
    ) 
  }
}
