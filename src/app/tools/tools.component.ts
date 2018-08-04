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
  providers: [TodoDataService]
})
export class ToolsComponent implements OnInit {

  todos: Todo[] = [];
  addNewTool={}
  typeArray = [];
  categoryArray = [];

  constructor(
    private todoDataService: TodoDataService
  ) {
  }

  public ngOnInit() {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
          const initialArr = todos as any;
          const uniqueArrayofTypeElem = [];
          const uniqueArrayofType = [];
          const uniqueArrayofCategoryElem = [];
          const uniqueArrayofCategory = [];
           initialArr.forEach((elem,i) => {
            if (!uniqueArrayofTypeElem.includes(elem.typeDescription)) {
              uniqueArrayofTypeElem.push(elem.typeDescription);
              uniqueArrayofType.push({ type: elem.type, typeDescription: elem.typeDescription });
            }

            if (!uniqueArrayofCategoryElem.includes(elem.categoryName)) {
              uniqueArrayofCategoryElem.push(elem.categoryName);
              uniqueArrayofCategory.push({ categoryId: elem.categoryId, categoryName: elem.categoryName });
            }
          });
          
          this.typeArray = uniqueArrayofType;
          this.categoryArray = uniqueArrayofCategory;
          console.log(this.typeArray);
        }
      );
  }

  onTypeChange(value,id) {
    console.log(value,id);
    this.addNewTool = Object.assign(this.addNewTool,{typeValue:value, typeId: id});
    console.log(this.addNewTool);
  
  }

  onCategoryChange(value,id) {
    this.addNewTool = Object.assign(this.addNewTool,{categoryValue:value, categoryId: id});
  }

  onKey(value){
    this.addNewTool = Object.assign(this.addNewTool,{title:value,"complete": false});
  }

  onSubmit(){
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
