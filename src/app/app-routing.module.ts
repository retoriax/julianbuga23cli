import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BugapointListComponent} from "./bugapoint-list/bugapoint-list.component";
import {MapComponent} from "./map/map.component";
import {BlankComponent} from "./blank/blank.component";


const routes: Routes = [
  { path: 'map', component: MapComponent},
  { path: 'blank', component: BlankComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
