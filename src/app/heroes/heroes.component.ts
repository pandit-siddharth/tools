import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Hero } from '../hero';
import { Todo } from '../Todo';
import { TodoDataService } from '.././todo-data.service';
declare var $: any;

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, AfterContentInit {

  todos: Todo[] = [];
  typeArr = [];
  categoryArr = [];
  selectedHero: Hero;
  selectedTab = '';
  overviewHeadingClass = 'active';
  tutorialHeadingClass = '';
  pocHeadingClass = '';
  overviewBodyClass = 'tab-pane fade in active';
  tutorialBodyClass = 'tab-pane';
  pocBodyClass = 'tab-pane';

  constructor(private todoDataService: TodoDataService) { }

  getHeroes(): void {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          console.log(todos);
          this.todos = todos;
          this.categoryArr = this.getUniqueCategories(todos);
          this.typeArr = this.getUniqueTypes(todos);
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

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.onOverviewClick();
  }

  // applyClass(tab): void {
  //   if (tab === 'overview') {
  //     return 'subTab active';

  //   } else if (tab === 'tutorial') {

  //   } else {

  //   }
  // }

  onOverviewClick(): void {
    this.selectedTab = 'overview';
    this.overviewHeadingClass = 'active';
    this.tutorialHeadingClass = '';
    this.pocHeadingClass = '';
    this.overviewBodyClass = 'tab-pane fade in active';
    this.tutorialBodyClass = 'tab-pane';
    this.pocBodyClass = 'tab-pane';
  }

  onTutorialClick(): void {
    this.selectedTab = 'tutorial';
    this.overviewHeadingClass = '';
    this.tutorialHeadingClass = 'active';
    this.pocHeadingClass = '';
    this.overviewBodyClass = 'tab-pane';
    this.tutorialBodyClass = 'tab-pane fade in active';
    this.pocBodyClass = 'tab-pane';
  }

  onPOCClick(): void {
    this.selectedTab = 'poc';
    this.overviewHeadingClass = '';
    this.tutorialHeadingClass = '';
    this.pocHeadingClass = 'active';
    this.overviewBodyClass = 'tab-pane';
    this.tutorialBodyClass = 'tab-pane';
    this.pocBodyClass = 'tab-pane fade in active';
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
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.onPageLoad();
    }, 500);
  }
}
