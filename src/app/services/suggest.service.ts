import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuggestService {

  constructor(private http: Http) { }
  getSuggestions(taskList) {
    const url = environment.api.url + environment.api.endpoints.suggest;

    return this.http.post(url, taskList).pipe(
      map((data => {
        return data['_body']
      }))
    );
  }
}
