import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';
import { ToolsComponent } from './tools/tools.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: HeroesComponent},
    {path: 'addTools', component: ToolsComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'delete', component: DeleteComponent},
    {path: '404', component: ErrorComponent},
    {path: '**', redirectTo: '404', pathMatch: 'full'}
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);

