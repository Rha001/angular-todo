import { Component, OnInit, NgModule, AfterContentInit } from '@angular/core';
import { SuggestService } from './services/suggest.service';

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
  public suggestions: any[];

  constructor(private suggestService: SuggestService) {
    this.tasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
    this.suggestions = [];
  }

  ngOnInit() {
    this.getSuggestions();
  }

  submit() {
    this.tasks.push({title: this.newTask, status: AppComponent._NEW});
    this.newTask = '';
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.getSuggestions();
  }

  finishTask(currentTask) {
    this.tasks[this.tasks.indexOf(currentTask)].status = AppComponent._DONE;
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.getSuggestions();
  }

  removeTask(currentTask) {
    const taskToRemove: number = this.tasks.indexOf(currentTask);

    if (taskToRemove > 0) {
      this.tasks.splice(taskToRemove, 1);
      window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.getSuggestions();
    }
  }

  updateTask(currentTask, event) {
    const newContent = event.target.innerText || event.target.textContent;
    if (newContent.length > 0) {
      this.tasks[this.tasks.indexOf(currentTask)].title = newContent;
      window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.getSuggestions();
    } else {
      const text = ('innerText' in event.target) ? 'innerText' : 'textContent';
      event.target[text] = this.tasks[this.tasks.indexOf(currentTask)].title;
    }
  }

  getSuggestions() {
    const taskList = {body: JSON.stringify(this.tasks.filter(item => item.status === AppComponent._NEW))};

    this.suggestService.getSuggestions(taskList)
      .subscribe(data => {
        this.suggestions = JSON.parse(data);console.log(this.suggestions);
      });
  }
}
