import { Component } from '@angular/core';
import { Task } from '../task';
import { Observable, of, from } from 'rxjs';
import { TaskServiceService } from '../task-service.service';
@Component({
  selector: 'curr-list',
  templateUrl: './curr-list.component.html',
  styleUrls: ['./curr-list.component.css']  // Fixed "styleUrls"
})
export class CurrListComponent {
  
  tasks: Task[] =[]
  newTitle: string = ""
  newLength: number = 0;
  showDia: boolean = false;
  creationSucess: boolean = false;

  constructor(private taskService: TaskServiceService) {}

  ngOnInit() {
    this.taskService.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  showDialaugue() {
    this.showDia = true;
  }

  countTime() {
    for(let i = 0; i < this.tasks.length; i++) {
      this.newLength += this.tasks[i].task_length;
    }
  }

  submit() {
    
  }


  
  

}
