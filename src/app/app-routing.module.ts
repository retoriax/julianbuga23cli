import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {AdminpanelMenuComponent} from "./adminpanel/adminpanel-menu/adminpanel-menu.component";
import {AdminpanelBugapointsComponent} from "./adminpanel/adminpanel-bugapointmenu/adminpanel-bugapoints.component";
import {AdminpanelNewpointpanelComponent} from "./adminpanel/adminpanel-newpointpanel/adminpanel-newpointpanel.component";
import {BlankComponent} from "./blank/blank.component";


const routes: Routes = [
  { path: 'map', component: MapComponent},
  { path: 'admin/menu', component: AdminpanelMenuComponent},
  { path: 'admin/bugapoints', component: AdminpanelBugapointsComponent},
  { path: 'admin/bugapoints/new', component: AdminpanelNewpointpanelComponent },
  { path: 'blank', component: BlankComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
