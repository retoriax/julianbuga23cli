import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './navbar/navbar.component';
import { RoutePlannerComponent } from './route-components/route-planner/route-planner.component';
import { BugapointAutocompleteFieldComponent } from './route-components/bugapoint-autocomplete-field/bugapoint-autocomplete-field.component';
import { BugapointDragAndDropComponent } from './route-components/bugapoint-drag-and-drop/bugapoint-drag-and-drop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { LoginFormComponent } from './login-form/login-form.component';
import { MapFilterComponent } from './map-filter/map-filter.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MapAnsichtComponent } from './map-ansicht/map-ansicht.component';
import {MatButtonModule} from "@angular/material/button";
import {RegisterUiComponent} from "./UI/register-ui/register-ui.component";
import {RegisterFormComponent} from "./UI/register-components/register-form/register-form.component";
import { TokenCheckerComponent } from './UI/register-components/token-checker/token-checker.component';
import {MatCardModule} from "@angular/material/card";
import { AdminpanelMenuComponent } from './admin-components/adminpanel-menu/adminpanel-menu.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatListModule} from "@angular/material/list";
import { BugapointmenuComponent } from './admin-components/bugapoint-management/bugapointmenu/bugapointmenu.component';
import { AdminpanelSubmenubarComponent } from './admin-components/adminpanel-submenubar/adminpanel-submenubar.component';
import { BugapointlistComponent } from './admin-components/bugapoint-management/bugapointlist/bugapointlist.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { NewpointpanelComponent } from './admin-components/bugapoint-management/newpointpanel/newpointpanel.component';
import { BugapointpanelComponent } from './admin-components/bugapoint-management/bugapointpanel/bugapointpanel.component';
import { BlankComponent } from './blank/blank.component';
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {MatDividerModule} from "@angular/material/divider";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import { BugapointBoxComponent } from './route-components/bugapoint-box/bugapoint-box.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FilterComponent} from "./admin-components/bugapoint-management/filter/filter.component";
import {SavedialogComponent} from "./admin-components/bugapoint-management/savedialog/savedialog.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    RoutePlannerComponent,
    BugapointAutocompleteFieldComponent,
    BugapointDragAndDropComponent,
    LoginFormComponent,
    MapFilterComponent,
    AdminpanelMenuComponent,
    BugapointmenuComponent,
    AdminpanelSubmenubarComponent,
    BugapointlistComponent,
    NewpointpanelComponent,
    BugapointpanelComponent,
    BlankComponent,
    RegisterFormComponent,
    RegisterUiComponent,
    TokenCheckerComponent,
    SavedialogComponent,
    BugapointBoxComponent,
    MapAnsichtComponent,
    FilterComponent,
    BugapointDragAndDropComponent
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
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    ScrollingModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonModule,
    MatLegacyChipsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSnackBarModule,
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
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
