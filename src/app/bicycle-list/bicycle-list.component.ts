import { Component, OnInit } from '@angular/core';
import { Bicycle } from '../models/bicycle';
import { BicycleService } from '../services/bicycle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StationService } from '../services/station.service';
import { Station } from '../models/bicycle';
@Component({
  selector: 'app-bicycle-list',
  standalone: false,
  
  templateUrl: './bicycle-list.component.html',
  styleUrl: './bicycle-list.component.css'
})
export class BicycleListComponent implements OnInit{
  bicycles: Bicycle[] = [];
  stations: Station[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  serialnumberFilter: string = '';
  stationfilter: string | undefined;
  stationloaded: boolean = false;
  constructor(private bicycleService: BicycleService, private stationService: StationService, private router: Router) { }
  ngOnInit(): void {
    this.getBicycles();
    this.getStations();
  }
  sortByID(): void {
    
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    
    this.bicycles.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  
  sortBySerialNumber(): void {
    
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    
    this.bicycles.sort((a, b) => {
      const serialnumberA = a.serialnumber.toLowerCase(); 
      const serialnumberB = b.serialnumber.toLowerCase();

      if (serialnumberA < serialnumberB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (serialnumberA > serialnumberB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0; 
    });
  }
  getBicycles(): void {
    this.bicycleService.getBicycle().subscribe((bicycles) => {
      this.bicycles = bicycles;
    });
  }

  getStations(): void {
    this.stationService.getStation().subscribe((stations) => {
      this.stations = stations;
      this.stationfilter = '';
      this.stationloaded = true;
    })
  }

  applyFilters(): void {
    this.bicycleService.getBicycle().subscribe((bicycles) => {
      this.bicycles = this.filterBicycles(bicycles);
    });
  }

  filterByStation(bicycle: Bicycle): boolean {
    return (
      this.stationfilter === undefined ||
      this.stationfilter === '' ||
      bicycle.station.location.toLowerCase().includes(this.stationfilter.toLowerCase())
    );
  }

  filterBicycles(bicycles: Bicycle[]): Bicycle[] {
    return bicycles.filter(bicycles =>
      this.filterBySerialNumber(bicycles) &&
      this.filterByStation(bicycles)
    );
  }

  filterBySerialNumber(bicycle: Bicycle): boolean {
    return this.serialnumberFilter === '' || bicycle.serialnumber.toLowerCase().includes(this.serialnumberFilter.toLowerCase());
  }

  viewBicycleDetails(bicycle: Bicycle): void {
    this.router.navigate(['/bicycle-detail', bicycle.id]);
  }

  editBicycle(bicycle: Bicycle): void {
    this.router.navigate(['/bicycle-edit', bicycle.id]);
  }

  deleteBicycle(bicycle: Bicycle): void {
    if (confirm('Do you want to delete the bicycle')) {
      this.bicycleService.deleteBicycle(bicycle.id).subscribe(() => {
        this.getBicycles();
      });
    }
  }
}
