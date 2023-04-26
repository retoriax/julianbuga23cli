import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {RoutePlannerComponent} from "./route-components/route-planner/route-planner.component";
import {AdminpanelMenuComponent} from "./admin-components/adminpanel-menu/adminpanel-menu.component";
import {AdminpanelBugapointsComponent} from "./admin-components/adminpanel-bugapointmenu/adminpanel-bugapoints.component";
import {AdminpanelNewpointpanelComponent} from "./admin-components/adminpanel-newpointpanel/adminpanel-newpointpanel.component";
import {BlankComponent} from "./blank/blank.component";
import {RegisterUiComponent} from "./UI/register-ui/register-ui.component";
import {LoginFormComponent} from "./login-form/login-form.component";


const routes: Routes = [
  { path: '', redirectTo: ' /map', pathMatch: 'full' },
  { path: 'route-planner', component: RoutePlannerComponent},
  { path: 'map', component: MapComponent},
  { path: 'register', component: RegisterUiComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'admin/menu', component: AdminpanelMenuComponent},
  { path: 'admin/bugapoints', component: AdminpanelBugapointsComponent},
  { path: 'admin/bugapoints/new', component: AdminpanelNewpointpanelComponent },
  { path: 'blank', component: BlankComponent},
  { path: '**', redirectTo: '/map' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
