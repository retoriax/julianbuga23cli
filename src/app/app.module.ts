import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './service/user-service.service';
import { BugapointListComponent } from './bugapoint-list/bugapoint-list.component';
import { BugapointFormComponent } from './bugapoint-form/bugapoint-form.component';
import { MapComponent } from './map/map.component';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './navbar/navbar.component';
import { MapFilterComponent } from './map-filter/map-filter.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminpanelMenuComponent } from './adminpanel-menu/adminpanel-menu.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MatListModule} from "@angular/material/list";
import { AdminpanelBugapointsComponent } from './adminpanel-bugapoints/adminpanel-bugapoints.component';
import { AdminpanelSubmenubarComponent } from './adminpanel-submenubar/adminpanel-submenubar.component';
import { AdminpanelBugapointlistComponent } from './adminpanel-bugapointlist/adminpanel-bugapointlist.component';
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    BugapointListComponent,
    BugapointFormComponent,
    MapComponent,
    NavbarComponent,
    MapFilterComponent,
    AdminpanelMenuComponent,
    AdminpanelBugapointsComponent,
    AdminpanelSubmenubarComponent,
    AdminpanelBugapointlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatListModule,
    MatExpansionModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
