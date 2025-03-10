import { Component } from '@angular/core';
import { Task } from '../task';
import { Observable, of, from, map, tap } from 'rxjs';
import { TaskServiceService } from '../task-service.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'curr-list',
  templateUrl: './curr-list.component.html',
  styleUrls: ['./curr-list.component.css'] 
})
export class CurrListComponent {
  
  newTitle: string = ""
  newLength: number = 0;
  showDia: boolean = false;
  creationSucess: boolean = false;
  dueDate: string = "";
  selectedTask: Task = { id: 0, content: "", completed: false, task_length: 0, dueDate: "" };

  constructor(private taskService: TaskServiceService, private cdRef: ChangeDetectorRef) {}


  getTaskService() {
    return this.taskService;
  }

  ngOnInit() {
    this.taskService.orderTasks();
  }

  getTasks(): void {
    this.taskService.getTasks();
    console.log("got tasks");
  }

  showDialaugue() {
    if(this.showDia) {
      this.showDia = false;
      this.newLength = 0;
      this.newTitle = "";
      this.dueDate = "";
      this.selectedTask = { id: 0, content: "", completed: false, task_length: 0, dueDate: "" };
    } else {
      this.showDia = true;
    }
  }

  upAdd() {
    return this.selectedTask.id ? "Update" : "Add";
  }

  updateDialague(task: Task) {
    if(this.showDia) {
      this.showDia = false;
      this.newLength = 0;
      this.newTitle = "";
      this.dueDate = "";
      this.selectedTask = { id: 0, content: "", completed: false, task_length: 0, dueDate: "" };
    } else {
      this.showDia = true;
      this.selectedTask = task;
      this.cdRef.detectChanges();
      this.newTitle = task.content;
      this.newLength = task.task_length;
      this.dueDate = task.dueDate;
    }
  }

  countTime(): Observable<Number> {
    return this.taskService.tasks$.pipe(
      map((arr: Task[]) => arr.reduce((acc: number, task: Task) => acc + task.task_length, 0))
    ); 
  }

  submit() {

    if(this.selectedTask.id != 0) {
      this.updateTask(this.selectedTask);
      this.newLength = 0;
      this.newTitle = "";
      this.dueDate = "";
      return;
    }

    let toSubmit: Task =  {
      id: 0,
      content: this.newTitle,
      completed: false,
      task_length: this.newLength,
      dueDate: this.dueDate
    }

    this.taskService.addTask(toSubmit).subscribe({
      next: (data) => {
        console.log("Task added");
        this.creationSucess = true;
        setTimeout(() => {
          this.creationSucess = false;
        }, 2000);
        this.getTasks();
        this.showDia = false;
      },
      error: () => {
        console.log("Error adding task");
      }
    });    
  }

  deleteTask(id: number) {
    console.log("Deleting task with id: " + id);
    this.taskService.deleteTask(id).subscribe();
    this.getTasks();
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe();
    this.getTasks();
  }


  
  

}
