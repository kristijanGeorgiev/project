import { Component, OnInit } from '@angular/core';
import { Station } from '../models/bicycle';
import { StationService } from '../services/station.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-station-list',
  standalone: false,
  
  templateUrl: './station-list.component.html',
  styleUrl: './station-list.component.css'
})
export class StationListComponent implements OnInit{
  stations: Station[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  locationFilter: string = '';
  constructor(private stationService: StationService, private router: Router) { }

  ngOnInit(): void {
    this.getStations();
  }
  sortByID(): void {
    // Toggle sort direction
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    // Sort movies by ID
    this.stations.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  
  sortByLocation(): void {
    // Toggle sort direction
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    // Sort movies by title
    this.stations.sort((a, b) => {
      const stationA = a.location.toLowerCase(); // Case-insensitive comparison
      const stationB = b.location.toLowerCase();

      if (stationA < stationB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (stationA > stationB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0; // Titles are equal
    });
  }
  getStations(): void {
    this.stationService.getStation().subscribe((stations) => {
      this.stations = stations;
      console.log(stations);
    });
  }

  applyFilters(): void {
    this.stationService.getStation().subscribe((stations) => {
      this.stations = this.filterStations(stations);
    });
  }

  filterStations(stations: Station[]): Station[] {
    return stations.filter(station =>
      this.filterByLocation(station)
    );
  }

  filterByLocation(station: Station): boolean {
    return this.locationFilter === '' || station.location.toLowerCase().includes(this.locationFilter.toLowerCase());
  }

  viewStationDetails(station: Station): void {
    this.router.navigate(['/station-detail', station.id]);
  }

  editStation(station: Station): void {
    this.router.navigate(['/station-edit', station.id]);
  }

  deleteStation(station: Station): void {
    if (confirm('Do you want to delete the station')) {
      this.stationService.deleteStation(station.id).subscribe(() => {
        this.getStations();
      });
    }
  }
}
