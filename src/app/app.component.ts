import { Component, OnInit } from '@angular/core';

interface status {

}

interface task {
  title: string;
  status: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  static _NEW = 0;
  static _DONE =  1;
  private newTask: string;
  public tasks: task[] ;

  ngOnInit() {
    this.tasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
  }

  submit() {
    this.tasks.push({title: this.newTask, status: AppComponent._NEW})
    this.newTask = '';
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  finishTask() {
    
  }
}
