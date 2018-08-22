import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../todo-data.service';

@Component({
  selector: 'app-tools',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [TodoDataService]
})
export class AdminComponent implements AfterViewInit {
  adminLogin = <any>{};
  loginResponse = <any>{};
  showLoader: boolean;
  usernameError: string;
  passwordError: string;
  loginMessage: string;

  constructor(private todoDataService: TodoDataService, private router: Router) { }

  ngAfterViewInit() {
    document.getElementById('username')
      .addEventListener('keyup', function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
          document.getElementById('login-submit').click();
        }
      });
    document.getElementById('password')
      .addEventListener('keyup', function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
          document.getElementById('login-submit').click();
        }
      });
  }

  onUserName(value) {
    this.adminLogin = Object.assign(this.adminLogin, { username: value });
    this.usernameError = '';
  }

  onPassword(value) {
    this.adminLogin = Object.assign(this.adminLogin, { password: value });
    this.passwordError = '';
  }

  onSubmit() {
    if (!('username' in this.adminLogin) || this.adminLogin.username === '') {
      this.usernameError = 'Please enter username.';
    } else if (!('password' in this.adminLogin) || this.adminLogin.password === '') {
      this.passwordError = 'Please enter password.';
    } else {
      this.todoDataService
        .login(this.adminLogin)
        .subscribe(
          (newTodo) => {
            this.loginResponse = newTodo;
            this.showLoader = true;
            setTimeout(() => {
              this.showLoader = false;
              if (this.loginResponse.data.error) {
                this.loginMessage = this.loginResponse.data.message;
              } else {
                sessionStorage.setItem('userLogin', JSON.stringify({ token: true }));
                this.loginMessage = '';
                this.router.navigate(['addTools']);
              }
            }, 1000);
          },
          error => {
            this.loginMessage = 'Something went wrong.';
          }
        );
    }
  }
}