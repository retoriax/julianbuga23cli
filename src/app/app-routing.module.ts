import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import {MapComponent} from "./map/map.component";
import {RoutePlannerComponent} from "./route-planner/route-planner.component";
import {BugapointListComponent} from "./bugapoint-list/bugapoint-list.component";

const routes: Routes = [
  { path: 'bugapoint', component: BugapointListComponent },
  { path: 'adduser', component: UserFormComponent },
  { path: 'route-planner', component: RoutePlannerComponent},
  { path: 'map', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
