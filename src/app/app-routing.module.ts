import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';
import { ToolsComponent } from './tools/tools.component';

const routes: Routes = [
    {path: '', redirectTo: 'hero', pathMatch: 'full'},
    {path: 'hero', component: HeroesComponent},
    {path: 'addtools', component: ToolsComponent},
    {path: '**', component: ToolsComponent}
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
