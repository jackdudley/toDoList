import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient) { }

  private tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  requestURL = 'http://localhost:8080/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  orderTasks() {
    this.http.get<Task[]>(this.requestURL + '/order').pipe(
      tap((tasks) => this.tasks.next(tasks))
    ).subscribe();
  }
    
  getTasks() {
    this.http.get<Task[]>(this.requestURL).pipe(
      tap((tasks) => this.tasks.next(tasks))
    ).subscribe();
  }

  addTask(task: Task): Observable<Task[]> { 
    return this.http.post<Task[]>(this.requestURL, task, this.httpOptions).pipe(
      tap((updatedTasks) => {
        if (JSON.stringify(this.tasks.getValue()) !== JSON.stringify(updatedTasks)) {
          this.tasks.next(updatedTasks);
        }
      })
    );
  }
  

  deleteTask(id: number): Observable<Task[]> { 
    return this.http.delete<Task[]>(`${this.requestURL}/${id}`, this.httpOptions).pipe(
      tap(updatedTasks => {
        if (JSON.stringify(this.tasks.getValue()) !== JSON.stringify(updatedTasks)) {
          this.tasks.next(updatedTasks);
        }
      })
    );
  }

  updateTask(task: Task): Observable<Task[]> {
    return this.http.put<Task[]>(`${this.requestURL}/${task.id}`, task, this.httpOptions).pipe(
      tap(updatedTasks => {
        if (JSON.stringify(this.tasks.getValue()) !== JSON.stringify(updatedTasks)) {
          this.tasks.next(updatedTasks);
        }
      })
    );
  }

  getTask(id: number) {
    return this.http.get<Task>(this.requestURL + "/" + id);
  }

}
