import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Station } from '../models/bicycle';
import { StationService } from '../services/station.service';
@Component({
  selector: 'app-station-add',
  standalone: false,
  
  templateUrl: './station-add.component.html',
  styleUrl: './station-add.component.css'
})
export class StationAddComponent {
  newStation: Station = {
    id: 0,
    location: '',
    capacity: 0,
    address: ''
  };

  constructor(private stationService: StationService, private router: Router) {}

  addStation(): void {
    this.stationService.addStation(this.newStation).subscribe(() => {
      this.router.navigate(['/station-list']);
    });
  }
  goToStationList(): void {
    this.router.navigate(['/station']);
  }
}
