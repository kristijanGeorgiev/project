import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationListComponent } from './station-list/station-list.component';
import { StationAddComponent } from './station-add/station-add.component';
import { StationDetailComponent } from './station-detail/station-detail.component';
import { StationEditComponent } from './station-edit/station-edit.component';
import { BicycleListComponent } from './bicycle-list/bicycle-list.component';
import { BicycleAddComponent } from './bicycle-add/bicycle-add.component';
import { BicycleDetailComponent } from './bicycle-detail/bicycle-detail.component';
import { BicycleEditComponent } from './bicycle-edit/bicycle-edit.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { MaintenanceAddComponent } from './maintenance-add/maintenance-add.component';
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';
import { MaintenanceEditComponent } from './maintenance-edit/maintenance-edit.component';
import { RideListComponent } from './ride-list/ride-list.component';
import { RideAddComponent } from './ride-add/ride-add.component';
import { RideDetailComponent } from './ride-detail/ride-detail.component';
import { RideEditComponent } from './ride-edit/ride-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/station', pathMatch: 'full' },
  { path: 'station', component: StationListComponent },
  { path: 'station-add', component: StationAddComponent },
  { path: 'station-detail/:id', component: StationDetailComponent },
  { path: 'station-edit/:id', component: StationEditComponent },
  { path: 'bicycle', component: BicycleListComponent},
  { path: 'bicycle-add', component: BicycleAddComponent},
  { path: 'bicycle-detail/:id', component: BicycleDetailComponent},
  { path: 'bicycle-edit/:id', component: BicycleEditComponent},
  { path: 'client', component: ClientListComponent},
  { path: 'client-add', component: ClientAddComponent},
  { path: 'client-detail/:id', component: ClientDetailComponent},
  { path: 'client-edit/:id', component: ClientEditComponent},
  { path: 'maintenance', component: MaintenanceListComponent},
  { path: 'maintenance-add', component: MaintenanceAddComponent},
  { path: 'maintenance-detail/:id', component: MaintenanceDetailComponent},
  { path: 'maintenance-edit/:id', component: MaintenanceEditComponent},
  { path: 'ride', component: RideListComponent},
  { path: 'ride-add', component: RideAddComponent},
  { path: 'ride-detail/:id', component: RideDetailComponent},
  { path: 'ride-edit/:id', component: RideEditComponent},
  { path: '**', redirectTo: '/station' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
