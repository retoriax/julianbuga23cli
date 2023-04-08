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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutePlannerComponent } from './route-planner/route-planner.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BugapointAutocorrectFieldComponent } from './bugapoint-autocorrect-field/bugapoint-autocorrect-field.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    BugapointListComponent,
    BugapointFormComponent,
    MapComponent,
    NavbarComponent,
    RoutePlannerComponent,
    BugapointAutocorrectFieldComponent,
    BugapointAutocorrectFieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
