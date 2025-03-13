import { Component } from '@angular/core';
import { Task } from '../task';
import { Observable, of, from, map, tap, take, BehaviorSubject, switchMap } from 'rxjs';
import { TaskServiceService } from '../task-service.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'curr-list',
  templateUrl: './curr-list.component.html',
  styleUrls: ['./curr-list.component.css'] 
})
export class CurrListComponent {
  
  newTitle: string = ""
  newLength: number | null = null;
  showDia: boolean = false;
  creationSucess: boolean = false;
  dueDate: string = "";
  description: string = "";
  selectedTask: BehaviorSubject<Task> = new BehaviorSubject<Task>({ id: 0, content: "", completed: false, task_length: null, dueDate: "", description: ""});

  
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
      this.newLength = null;
      this.newTitle = "";
      this.dueDate = "";
      this.description = "";
    } else {
      this.showDia = true;
      var task: Task = this.selectedTask.getValue();
      if(task.id != 0) {
        this.newLength = task.task_length;
        this.newTitle = task.content;
        this.dueDate = task.dueDate;
        this.description = task.description;
      }
    }
  }

  upAdd() {
    console.log("ua called")
    return this.selectedTask.getValue().id!=0 ? "Update" : "Add";
  }

  updateClick(id: number) {
    return this.taskService.getTask(id).subscribe(task => {
      this.selectedTask.next(task);
      console.log(task);
      this.showDialaugue()
    })
  }

  countTime(): Observable<Number> {
    return this.taskService.tasks$.pipe(
      map((arr: Task[]) => arr.reduce((acc: number, task: Task) => acc + (task.task_length ?? 0), 0))
    ); 
  }

  submit() {
    this.selectedTask.pipe(
      take(1),
      switchMap(task => {
        if (task.id) {
          return this.taskService.updateTask({
            id: task.id,
            content: this.newTitle,
            completed: false,
            task_length: this.newLength,
            dueDate: this.dueDate,
            description: this.description
          }).pipe(
            tap(() => { 
              this.selectedTask.next({
                id: 0,
                content: '',
                completed: false,
                task_length: 0,
                dueDate: '',
                description: ''
              });
            })
          );
        } else {
          return this.taskService.addTask({
            id: 0,
            content: this.newTitle,
            completed: false,
            task_length: this.newLength,
            dueDate: this.dueDate,
            description: this.description
          });
        }
      })
    ).subscribe({
      next: () => {
        console.log("Task processed successfully");
        this.creationSucess = true;
        setTimeout(() => {
          this.creationSucess = false;
        }, 2000);
        this.getTasks();
        this.showDia = false;
      },
      error: () => {
        console.log("Error processing task");
      }
    });
  }    

  deleteTask(id: number) {
    console.log("Deleting task with id: " + id);
    this.taskService.deleteTask(id).subscribe();
    this.getTasks();
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe(data => {
      console.log(data);
    });
    this.getTasks();
  }

}
