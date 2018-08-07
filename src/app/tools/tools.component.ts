// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tools',
//   templateUrl: './tools.component.html'
// })
// export class ToolsComponent {

//   constructor() { }

// }

import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../todo-data.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  providers: [TodoDataService]
})
export class ToolsComponent implements OnInit {

  todos: Todo[] = [];
  addNewTool = {};
  categoryArr: any;
  typeArr: any;

  constructor(private todoDataService: TodoDataService) {
  }

  public ngOnInit() {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
          this.categoryArr = this.getUniqueCategories(todos);
          this.typeArr = this.getUniqueTypes(todos);
          // console.log(this.categoryArr);
        }
      );
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
    // this.typeArr = uniqueArrayofTypeObj;
    // this.categoryArr = uniqueArrayofCatObj;
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
    // this.typeArr = uniqueArrayofTypeObj;
    // this.categoryArr = uniqueArrayofCatObj;
  }

  onTypeChange(value, id) {
    console.log(value, id);
    this.addNewTool = Object.assign(this.addNewTool, { typeValue: value, typeId: id });
    console.log(this.addNewTool);

  }

  onCategoryChange(value, id) {
    this.addNewTool = Object.assign(this.addNewTool, { categoryValue: value, categoryId: id });
  }

  onKey(value) {
    this.addNewTool = Object.assign(this.addNewTool, { title: value, 'complete': false });
  }

  onSubmit() {
    console.log('here');
    this.todoDataService
      .addTodo(this.addNewTool)
      .subscribe(
        (newTodo) => {
          console.log(newTodo);
          //this.todos = this.todos.concat(newTodo);
        }
      );
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
