import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../todo-data.service';
import { Router } from '@angular/router';
import { Todo } from '../todo';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  providers: [TodoDataService]
})
export class ToolsComponent implements OnInit {

  todos: Todo[] = [];

  addNewTool = <any>{};
  categoryArr: any;
  typeArr: any;
  emptyError: string;
  typeError: string;
  categoryError: string;
  typeArray = [];
  categoryArray = [];
  isLoggedIn = false;
  confirmationMessage: string;
  added: boolean;
  showLoader: boolean;

  constructor(private todoDataService: TodoDataService, private router: Router) {
  }

  public ngOnInit() {
    const currentUser = JSON.parse(sessionStorage.getItem('userLogin'));
    if (currentUser !== null) {
      const token = currentUser.token;
      this.isLoggedIn = token;
      if (this.isLoggedIn) {
        this.todoDataService
          .getAllTodos()
          .subscribe(
            (todos) => {
              this.todos = todos;
              this.categoryArr = this.getUniqueCategories(todos);
              this.typeArr = this.getUniqueTypes(todos);
            });
      } else {
        this.router.navigate(['index']);
      }
    } else {
      this.router.navigate(['index']);
    }
  }

  getUniqueCategories(todos): any {
    const initialArr = todos as any;
    const uniqueArrayofTypeElem = [];
    const uniqueArrayofTypeObj = [];
    const uniqueArrayofCatElem = [];
    const uniqueArrayofCatObj = [];

    initialArr.forEach(elem => {
      if (!uniqueArrayofTypeElem.includes(elem.typeDescription)) {
        uniqueArrayofTypeElem.push(elem.typeDescription);
        uniqueArrayofTypeObj.push({ type: elem.type, typeDescription: elem.typeDescription });
      }

      if (!uniqueArrayofCatElem.includes(elem.categoryName)) {
        uniqueArrayofCatElem.push(elem.categoryName);
        uniqueArrayofCatObj.push({ categoryId: elem.categoryId, categoryName: elem.categoryName });
      }

    });
    return uniqueArrayofCatObj;
  }

  getUniqueTypes(todos): any {
    const initialArr = todos as any;
    const uniqueArrayofTypeElem = [];
    const uniqueArrayofTypeObj = [];
    const uniqueArrayofCatElem = [];
    const uniqueArrayofCatObj = [];

    initialArr.forEach(elem => {
      if (!uniqueArrayofTypeElem.includes(elem.typeDescription)) {
        uniqueArrayofTypeElem.push(elem.typeDescription);
        uniqueArrayofTypeObj.push({ type: elem.type, typeDescription: elem.typeDescription });
      }

      if (!uniqueArrayofCatElem.includes(elem.categoryName)) {
        uniqueArrayofCatElem.push(elem.categoryName);
        uniqueArrayofCatObj.push({ categoryId: elem.categoryId, categoryName: elem.categoryName });
      }

    });
    return uniqueArrayofTypeObj;
  }

  onTypeChange(value, id) {
    this.addNewTool = Object.assign(this.addNewTool, { typeValue: value, typeId: id });
    this.typeError = '';
    this.confirmationMessage = '';

  }

  onCategoryChange(value, id) {
    this.addNewTool = Object.assign(this.addNewTool, { categoryValue: value, categoryId: id });
    this.categoryError = '';
    this.confirmationMessage = '';
    this.added = false;
  }

  onKey(value) {
    this.addNewTool = Object.assign(this.addNewTool, { title: value, 'complete': false });
    this.emptyError = '';
    this.confirmationMessage = '';
    this.added = false;
  }

  onSubmit(value) {
    if (!('typeId' in this.addNewTool) || this.addNewTool.typeId === '') {
      this.typeError = 'Please select tool type';
    } else if (!('categoryId' in this.addNewTool) || this.addNewTool.categoryId === '') {
      this.categoryError = 'Please select tool category';
    } else if (value && value.trim() !== '') {
      this.todoDataService
        .addTodo(this.addNewTool)
        .subscribe(
          (newTodo) => {
            this.showLoader = true;
            setTimeout(() => {
              this.showLoader = false;
              this.confirmationMessage = 'Tool Added Successfully';
              this.added = true;
            }, 1000);
          });
    } else {
      this.emptyError = 'Please fill in the name';
      this.confirmationMessage = '';
      this.added = false;
    }
  }

  onRemoveTodo(todo) {
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe(
        (_) => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        }
      );
  }
}
