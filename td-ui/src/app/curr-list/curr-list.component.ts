import { Component } from '@angular/core';
import { Task } from '../task';
import { Tasks } from '../tasks-service';
import { Observable, of, from } from 'rxjs';

@Component({
  selector: 'curr-list',
  templateUrl: './curr-list.component.html',
  styleUrls: ['./curr-list.component.css']  // Fixed "styleUrls"
})
export class CurrListComponent {
  
  taskList: Task[] = [];
  newTitle: string = ""
  newLength: number = 0;
  showDia: boolean = false;
  creationSucess: boolean = false;

  // Inject Tasks service into constructor
  constructor(private taskService: Tasks) {}

  countTime(): number {
    return this.taskList.reduce((time, task) => time + task.length, 0);
  }

  getTasks(): Task[] {
    return this.taskList;
  }

  addTask(): void {
    this.creationSucess = false;
    if(this.newLength == 0) {
      return;
    }
    for(let i = 0; i < this.taskList.length; i++) {
      if(this.taskList[i].title === this.newTitle) {
        return;
      }
    }
    this.creationSucess = true;
    this.taskList.push({title: this.newTitle, length: this.newLength});
    setTimeout(() => {
      this.creationSucess = false;
    }, 3000);
  }

  showDialaugue() {
    if(this.showDia) {
      this.showDia = false;
      return;
    } 
    this.showDia = true;
    return;
  }

  submit() {
    this.addTask();
    this.showDialaugue();
  }
}
