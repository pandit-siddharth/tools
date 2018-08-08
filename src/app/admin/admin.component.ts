import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../todo-data.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-tools',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [TodoDataService]
})
export class AdminComponent  {
    adminLogin = {};
    emptyError: string;
    constructor(private todoDataService: TodoDataService) {
  }

  
onUserName(value){
    console.log(value);
    this.adminLogin = Object.assign(this.adminLogin,{username: value});
}

onPassword(value){
    this.adminLogin = Object.assign(this.adminLogin,{password: value});
}

onSubmit(value) {
    console.log(this.adminLogin);
    // if (value && value.trim() !== '') {
    //   this.todoDataService
    //     .addTodo(this.adminLogin)
    //     .subscribe(
    //       (newTodo) => {
    //         console.log(newTodo);
    //       });
    // } else {
    //   this.emptyError = 'Please fill in the name';
    // }
  }
}