import { Component, OnInit, NgModule } from '@angular/core';
import { TaskOrderPipe } from './pipes/task-order/task-order.pipe';

interface Task {
  title: string;
  status: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  static _NEW = 0;
  static _DONE =  1;
  private newTask: string;
  public tasks: Task[] ;

  constructor() {}

  ngOnInit() {
    this.tasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
  }

  submit() {
    this.tasks.push({title: this.newTask, status: AppComponent._NEW});
    this.newTask = '';
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  finishTask(currentTask) {
    this.tasks[this.tasks.indexOf(currentTask)].status = AppComponent._DONE;
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeTask(currentTask) {
    console.log('delete: ', this.tasks[this.tasks.indexOf(currentTask)]);
  }

  updateTask(currentTask, event) {
    const newContent = event.target.innerText || event.target.textContent;

    this.tasks[this.tasks.indexOf(currentTask)].title = newContent;
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
