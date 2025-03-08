import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient) { }

  requestURL = 'http://localhost:8080/tasks';

  getTasks() {
    return this.http.get<Task[]>(this.requestURL);
  }
  
}
