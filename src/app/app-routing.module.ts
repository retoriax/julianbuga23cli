import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import {BugapointListComponent} from "./bugapoint-list/bugapoint-list.component";
import {MapComponent} from "./map/map.component";
import {MapUiComponent} from "./map-ui/map-ui.component";

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'adduser', component: UserFormComponent },
  { path: 'bugapoints', component: BugapointListComponent},
  { path: 'map', component: MapUiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
