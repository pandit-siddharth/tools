import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Todo } from '../Todo';
import { TodoDataService } from '.././todo-data.service';
declare var $: any;

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // heroes: Hero[];
  todos: Todo[] = [];
  todos1 = [];
  todos2 = [];
  selectedHero: Hero;

  constructor(private todoDataService: TodoDataService) { }

  getHeroes(): void {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
          const typeArr = [];
          const typeDisp = [];
          let largeArr = [];
          largeArr = todos;
          largeArr.forEach(elem => {
            // typeArr.forEach(arr => {
            // debugger;
            if (!typeArr.includes(elem.typeDescription)) {
              typeArr.push(elem.typeDescription);
              typeDisp.push({ type: elem.type, typeDescription: elem.typeDescription });
            }
            // });
          });
          this.todos1 = typeDisp;


          const catArr = [];
          const catDisp = [];
          let largeArr2 = [];
          largeArr2 = todos;
          largeArr2.forEach(elem => {
            // catArr.forEach(arr => {
            // debugger;
            if (!catArr.includes(elem.categoryName)) {
              catArr.push(elem.categoryName);
              catDisp.push({ categoryId: elem.categoryId, categoryName: elem.categoryName });
            }
            // });
          });
          this.todos2 = catDisp;
        }
      );

    // this.todoDataService
    // .getNodeTodos()
    // .subscribe(
    //   (todos1) => {
    //     //this.todos1 = todos1;
    //     //console.log(todos1);
    //   }
    // );
    // this.heroService.getHeroes()
    //   .subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  onPageLoad(): void {
    $(function () {
      $('li[class^="type-"]').mouseover(function () {
        const currentClass = $(this).attr('class').split(' ')[0];
        if (currentClass !== 'empty') {
          $('.main > li').addClass('deactivate');
          $('.' + currentClass).removeClass('deactivate');
        }
      });

      $('li[class^="cat-"]').mouseover(function () {
        const currentClass = $(this).attr('class').split(' ')[0];
        $('.main > li').addClass('deactivate');
        $('.' + currentClass).removeClass('deactivate');
      });

      $('.main > li').mouseout(function () {
        $('.main > li').removeClass('deactivate');
      });

      $('.list-2 > li').mouseout(function () {
        $('.main > li').removeClass('deactivate');
      });

      $('.list-1 > li').mouseout(function () {
        $('.main > li').removeClass('deactivate');
      });

    });
  }

  ngOnInit() {
    this.getHeroes();
    this.onPageLoad();
  }

}
