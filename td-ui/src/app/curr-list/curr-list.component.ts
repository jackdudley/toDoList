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
  
  newTitle: string = ""
  newLength: number = 0;
  showDia: boolean = false;
  creationSucess: boolean = false;

  // Inject Tasks service into constructor
  constructor(private taskService: TaskServiceService) {}

  ngOnInit() {
    this.taskService.getTasks();
  }

  
  
}
