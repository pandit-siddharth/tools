import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';
import { TodoDataService } from './todo-data.service';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { ApiService } from './api.service';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroService } from './hero.service';
import { AppRoutingModule } from './app-routing.module';
import { ToolsComponent } from './tools/tools.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    TodoListComponent,
    TodoListFooterComponent,
    TodoListHeaderComponent,
    TodoListItemComponent,
    ToolsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [TodoDataService, ApiService, HeroService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
