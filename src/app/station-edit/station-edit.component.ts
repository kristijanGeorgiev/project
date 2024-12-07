import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Station } from '../models/bicycle';
import { StationService } from '../services/station.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-station-edit',
  standalone: false,
  
  templateUrl: './station-edit.component.html',
  styleUrl: './station-edit.component.css'
})
export class StationEditComponent implements OnInit{
  station: Station | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.getStationDetails();
    this.getStations();
  }
  getStationDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.stationService.getStationById(+id).subscribe((station) => {
        this.station = station;
      });
    }
  }
  getStations(): void {
    this.stationService.getStation().subscribe((stations) => {
      this.station = this.station;
    });
  }
  saveChanges(): void {
    if (this.station) {
      this.stationService.updateStation(this.station).subscribe(() => {
        this.router.navigate(['/station-details', this.station!.id]);
      });
    }
  }
  goToStationList(): void {
    this.router.navigate(['/station']);
  }
}
