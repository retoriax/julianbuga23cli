import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BugapointListComponent } from '../testComponents/bugapoint-list/bugapoint-list.component';
import { MapComponent } from './map/map.component';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './navbar/navbar.component';
import { MapFilterComponent } from './map-filter/map-filter.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminpanelMenuComponent } from './admin-components/adminpanel-menu/adminpanel-menu.component';
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MatListModule} from "@angular/material/list";
import { AdminpanelBugapointsComponent } from './admin-components/adminpanel-bugapointmenu/adminpanel-bugapoints.component';
import { AdminpanelSubmenubarComponent } from './admin-components/adminpanel-submenubar/adminpanel-submenubar.component';
import { AdminpanelBugapointlistComponent } from './admin-components/adminpanel-bugapointlist/adminpanel-bugapointlist.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { AdminpanelNewpointpanelComponent } from './admin-components/adminpanel-newpointpanel/adminpanel-newpointpanel.component';
import { AdminpanelBugapointpanelComponent } from './admin-components/adminpanel-bugapointpanel/adminpanel-bugapointpanel.component';
import { BlankComponent } from './blank/blank.component';
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";

@NgModule({
  declarations: [
    AppComponent,
    BugapointListComponent,
    MapComponent,
    NavbarComponent,
    MapFilterComponent,
    AdminpanelMenuComponent,
    AdminpanelBugapointsComponent,
    AdminpanelSubmenubarComponent,
    AdminpanelBugapointlistComponent,
    AdminpanelNewpointpanelComponent,
    AdminpanelBugapointpanelComponent,
    BlankComponent
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
    MatAutocompleteModule,
    MatChipsModule,
    MatLegacyChipsModule,
  ],
  exports: [
    MapFilterComponent,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatListModule,
    MatExpansionModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
