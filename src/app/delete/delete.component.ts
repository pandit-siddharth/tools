import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../todo-data.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-tools',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  providers: [TodoDataService]
})
export class DeleteComponent implements OnInit {

  emptyError: string;
  confirmationMessage: String;
  todos: Todo[] = [];
  selectedId: number;
  deleted: boolean;
  isLoggedIn = false;
  showLoader: boolean;

  constructor(private todoDataService: TodoDataService, private router: Router) {
  }

  getTools(): void {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );
  }

  deleteById(id) {
    this.selectedId = id;
    this.deleted = false;
    this.confirmationMessage = '';
  }

  onSubmit() {
    if (this.selectedId) {
      this.emptyError = '';
      this.todoDataService
        .deleteTodoById(this.selectedId)
        .subscribe(
          (newTodo) => {
            this.showLoader = true;
            setTimeout(() => {
              this.confirmationMessage = 'Deleted Successfully';
              this.deleted = true;
              this.getTools();
              this.showLoader = false;
            }, 1000);
          });
    } else {
      this.emptyError = 'Please select the tool title';
      this.confirmationMessage = '';
    }
  }

  ngOnInit() {
    const currentUser = JSON.parse(sessionStorage.getItem('userLogin'));
    if (currentUser !== null) {
      const token = currentUser.token;
      this.isLoggedIn = token;
      if (this.isLoggedIn) {
        this.getTools();
      } else {
        this.router.navigate(['index']);
      }
    } else {
      this.router.navigate(['index']);
    }
  }
}
