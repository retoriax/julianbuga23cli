import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import {BugapointListComponent} from "./bugapoint-list/bugapoint-list.component";
import {MapComponent} from "./map/map.component";
import {AdminpanelMenuComponent} from "./adminpanel-menu/adminpanel-menu.component";


const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'adduser', component: AdminpanelMenuComponent },
  { path: 'bugapoints', component: BugapointListComponent},
  { path: 'map', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
