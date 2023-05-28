import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from "./map-components/map/map.component";
import {RoutePlannerComponent} from "./route-components/route-planner/route-planner.component";
import {AdminpanelMenuComponent} from "./admin-components/adminpanel-menu/adminpanel-menu.component";
import {BugapointmenuComponent} from "./admin-components/bugapoint-management/bugapointmenu/bugapointmenu.component";
import {BlankComponent} from "./blank/blank.component";
import {RegisterUiComponent} from "./UI/register-ui/register-ui.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {BugapointpanelComponent} from "./admin-components/bugapoint-management/bugapointpanel/bugapointpanel.component";
import {HelpMenuComponent} from "./help-components/help-menu/help-menu.component";



const routes: Routes = [
  { path: '', redirectTo: ' /map', pathMatch: 'full' },
  { path: 'route-planner', component: RoutePlannerComponent},
  { path: 'map', component: MapComponent},
  { path: 'register', component: RegisterUiComponent},
  { path: 'help', component: HelpMenuComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'admin/menu', component: AdminpanelMenuComponent},
  { path: 'admin/bugapoints', component: BugapointmenuComponent},
  { path: 'blank', component: BlankComponent},
  { path: 'admin/bugapoints/edit', component: BugapointpanelComponent},
  { path: 'admin/bugapoints/new', component: BugapointpanelComponent},
  { path: '**', redirectTo: '/map'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
