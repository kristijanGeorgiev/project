import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StationAddComponent } from './station-add/station-add.component';
import { StationDetailComponent } from './station-detail/station-detail.component';
import { StationEditComponent } from './station-edit/station-edit.component';
import { StationListComponent } from './station-list/station-list.component';
import { BicycleAddComponent } from './bicycle-add/bicycle-add.component';
import { BicycleDetailComponent } from './bicycle-detail/bicycle-detail.component';
import { BicycleEditComponent } from './bicycle-edit/bicycle-edit.component';
import { BicycleListComponent } from './bicycle-list/bicycle-list.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientListComponent } from './client-list/client-list.component';
import { MaintenanceAddComponent } from './maintenance-add/maintenance-add.component';
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';
import { MaintenanceEditComponent } from './maintenance-edit/maintenance-edit.component';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { RideAddComponent } from './ride-add/ride-add.component';
import { RideDetailComponent } from './ride-detail/ride-detail.component';
import { RideEditComponent } from './ride-edit/ride-edit.component';
import { RideListComponent } from './ride-list/ride-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StationAddComponent,
    StationDetailComponent,
    StationEditComponent,
    StationListComponent,
    BicycleAddComponent,
    BicycleDetailComponent,
    BicycleEditComponent,
    BicycleListComponent,
    ClientAddComponent,
    ClientDetailComponent,
    ClientEditComponent,
    ClientListComponent,
    MaintenanceAddComponent,
    MaintenanceDetailComponent,
    MaintenanceEditComponent,
    MaintenanceListComponent,
    RideAddComponent,
    RideDetailComponent,
    RideEditComponent,
    RideListComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
