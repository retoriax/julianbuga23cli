import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './navbar/navbar.component';
import { RoutePlannerComponent } from './route-components/route-planner/route-planner.component';
import { BugapointAutocompleteFieldComponent } from './route-components/bugapoint-autocomplete-field/bugapoint-autocomplete-field.component';
import { BugapointDragAndDropComponent } from './route-components/bugapoint-drag-and-drop/bugapoint-drag-and-drop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { LoginFormComponent } from './login-form/login-form.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from "@angular/material/button";
import {RegisterUiComponent} from "./UI/register-ui/register-ui.component";
import {RegisterFormComponent} from "./UI/register-components/register-form/register-form.component";
import { TokenCheckerComponent } from './UI/register-components/token-checker/token-checker.component';
import {MatCardModule} from "@angular/material/card";
import { AdminpanelMenuComponent } from './admin-components/adminpanel-menu/adminpanel-menu.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatListModule} from "@angular/material/list";
import { AdminpanelSubmenubarComponent } from './admin-components/adminpanel-submenubar/adminpanel-submenubar.component';
import {MatExpansionModule} from "@angular/material/expansion";
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
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MapComponent} from "./map-components/map/map.component";
import {MapFilterComponent} from "./map-components/map-filter/map-filter.component";
import {BugapointmenuComponent} from "./admin-components/bugapoint-management/bugapointmenu/bugapointmenu.component";
import {BugapointlistComponent} from "./admin-components/bugapoint-management/bugapointlist/bugapointlist.component";
import {BugapointpanelComponent} from "./admin-components/bugapoint-management/bugapointpanel/bugapointpanel.component";
import {MapAnsichtComponent} from "./map-components/map-ansicht/map-ansicht.component";
import {HelpMenuComponent} from "./help-components/help-menu/help-menu.component";
import {ImpressumComponent} from "./help-components/impressum/impressum.component";
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { DeleteDialogComponent } from './admin-components/bugapoint-management/delete-dialog/delete-dialog.component';
import { MapUserlocationComponent } from './map-components/map-userlocation/map-userlocation.component';
import {ReportCreateComponent} from "./admin-components/report-create/report-create.component";
import {ReportShowComponent} from "./admin-components/report-show/report-show.component";
import {ReportMenuComponent} from "./admin-components/report-menu/report-menu.component";
import { VisitorsReportMenuComponent } from './help-components/visitors-report-menu/visitors-report-menu.component';
import {RecaptchaModule} from "ng-recaptcha";


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
    BugapointpanelComponent,
    BlankComponent,
    RegisterFormComponent,
    RegisterUiComponent,
    TokenCheckerComponent,
    BugapointBoxComponent,
    MapAnsichtComponent,
    FilterComponent,
    BugapointDragAndDropComponent,
    HelpMenuComponent,
    ImpressumComponent,
    CookieBannerComponent,
    DeleteDialogComponent,
    MapUserlocationComponent,
    ReportMenuComponent,
    ReportShowComponent,
    ReportCreateComponent,
    VisitorsReportMenuComponent
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
    MatListModule,
    RecaptchaModule
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
