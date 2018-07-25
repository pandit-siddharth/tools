import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Todo } from '../Todo';
import { HeroService } from '../hero.service';
import { TodoDataService } from '.././todo-data.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // heroes: Hero[];
  todos: Todo[] = [];
  selectedHero: Hero;

  constructor(private todoDataService: TodoDataService) { }

  getHeroes(): void {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );
    // this.heroService.getHeroes()
    //   .subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  ngOnInit() {
    this.getHeroes();
  }

}
