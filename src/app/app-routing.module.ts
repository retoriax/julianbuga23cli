import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {AdminpanelMenuComponent} from "./adminpanel-menu/adminpanel-menu.component";
import {AdminpanelBugapointsComponent} from "./adminpanel-bugapoints/adminpanel-bugapoints.component";
import {AdminpanelNewpointpanelComponent} from "./adminpanel-newpointpanel/adminpanel-newpointpanel.component";


const routes: Routes = [
  { path: 'map', component: MapComponent},
  { path: 'admin/menu', component: AdminpanelMenuComponent},
  { path: 'admin/bugapoints', component: AdminpanelBugapointsComponent},
  { path: 'admin/bugapoints/new', component: AdminpanelNewpointpanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
