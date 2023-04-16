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
import { BugapointDragAndDropComponent } from './bugapoint-drag-and-drop/bugapoint-drag-and-drop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MapFilterComponent } from './map-filter/map-filter.component';
import {MatSelectModule} from "@angular/material/select";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    BugapointDragAndDropComponent,
    MapFilterComponent,
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
    ScrollingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
