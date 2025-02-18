import { Component } from '@angular/core';
import { Task } from '../task'
@Component({
  selector: 'curr-list',
  templateUrl: './curr-list.component.html',
  styleUrl: './curr-list.component.css'
})
export class CurrListComponent {
  
  swenOO: Task = {title: "SwenOO", length: 30};
  spanMovie: Task = {title: "Spanish Cien Años de Soledad", length: 75};
  taskList: Task[] = [this.swenOO, this.spanMovie];

  countTime(): number {
    let time: number = 0;
    for(let task of this.taskList) {
      time+= task.length;
    }
    return time;
  }
  
}
