import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Task } from '../models/task.class';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // public API_URL: string = 'http://localhost:3000/tasks'
  public API_URL: string = 'https://62947bc3a7203b3ed069dbdd.mockapi.io/todos'

  constructor(
    public http: HttpClient,
  ) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL)
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.API_URL}/${id}`)
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API_URL, {
      title: task.title,
      completed: task.completed
    })
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API_URL}/${task.id}`, {
      title: task.title,
      completed: task.completed
    })
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.API_URL}/${id}`)
  }
}
