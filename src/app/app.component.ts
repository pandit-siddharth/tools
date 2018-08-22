import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, DoCheck } from '@angular/core';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent implements AfterViewInit, DoCheck {
  extraIngredient: any;
  // @ViewChild(HeroesComponent) heroesComp: HeroesComponent;
  // set appBacon(heroesComp: HeroesComponent) {
  //   this.extraIngredient = heroesComp.getHeroes;
  // };

  todos: Todo[] = [];
  flag: boolean;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.getChildProperty();
  }

  ngDoCheck(): void {
    const currentUser = JSON.parse(sessionStorage.getItem('userLogin'));
    if (currentUser !== null) {
      const token = currentUser.token;
      this.flag = token;
    } else {
      this.flag = false;
    }
  }

  getChildProperty() {
    // console.log(this.extraIngredient);
  }

  clickMethod() {
    if (confirm('Do you want to logout?')) {
      sessionStorage.setItem('userLogin', JSON.stringify({ token: false }));
      this.router.navigate(['index']);
    }
  }

}
