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
import { BlankComponent } from './blank/blank.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    BugapointListComponent,
    MapComponent,
    NavbarComponent,
    MapFilterComponent,
    BlankComponent,
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
    MatChipsModule,
    MatLegacyChipsModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
