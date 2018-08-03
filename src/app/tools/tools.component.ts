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
