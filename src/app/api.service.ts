import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;
//const myUrl = environment.myUrl;
let body = new URLSearchParams();
@Injectable()
export class ApiService {
  headers: Headers;
  options: RequestOptions;

  constructor(
    private http: Http
  ) {
  }

  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get(API_URL + '/tools')
      .map(response => {
        const todos = response.json();
        return todos.data.map((todo) => new Todo(todo));
      })
      .catch(this.handleError);
  }

  public createTodo(todo): Observable<Todo> {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    body.set('typeValue', todo.typeValue);
    body.set('typeId', todo.typeId);
    body.set('categoryValue', todo.categoryValue);
    body.set('categoryId', todo.categoryId);
    body.set('title', todo.title);
    body.set('complete', todo.complete);

    return this.http
      .post('http://localhost:3333/create', body, options)
      .map(response => {
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public adminLogin(todo): Observable<Todo> {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    body.set('username', todo.username);
    body.set('password', todo.password);

    return this.http
      .post('http://localhost:3333/login', body, options)
      .map(response => {
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get(API_URL + '/tools/' + todoId)
      .map(response => {
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put(API_URL + '/tools/' + todo.id, todo)
      .map(response => {
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public deleteTodoById(todoId): Observable<null> {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .delete('http://localhost:3333/delete/' + todoId, options)
      .map(response => {
        const todos = response.json();
        return todos;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
