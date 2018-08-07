import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';
import { TodoDataService } from './todo-data.service';
// import { HeroesComponent } from './heroes/heroes.component';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent implements AfterViewInit {
  extraIngredient: any;
  // @ViewChild(HeroesComponent) heroesComp: HeroesComponent;
  // set appBacon(heroesComp: HeroesComponent) {
  //   this.extraIngredient = heroesComp.getHeroes;
  // };

  todos: Todo[] = [];

  constructor() { }

  ngAfterViewInit() {
    this.getChildProperty();
  }

  getChildProperty() {
    // console.log(this.extraIngredient);
  }

}
