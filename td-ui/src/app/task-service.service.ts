import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient) { }

  requestURL = 'http://localhost:8080/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  getTasks() {
    return this.http.get<Task[]>(this.requestURL);
  }

  addTask(task: Task) {
    return this.http.post<Task>(this.requestURL, task, this.httpOptions);
  }
  
}
