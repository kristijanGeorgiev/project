import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BicycleService } from '../services/bicycle.service';
import { StationService } from '../services/station.service';
import { Bicycle, Station } from '../models/bicycle';
@Component({
  selector: 'app-bicycle-add',
  standalone: false,
  
  templateUrl: './bicycle-add.component.html',
  styleUrl: './bicycle-add.component.css'
})
export class BicycleAddComponent implements OnInit{
  newBicycle: Bicycle = {
    serialnumber: '',
    model: '',
    status: '',
    station: {
      id: 0,
      location: '',
      capacity: 0,
      address: ''
    },
    id: 0
  };

  stations: Station[] = [];

  constructor(
    private bicycleService: BicycleService,
    private stationService: StationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    
    this.stationService.getStation().subscribe({
      next: (stations) => (this.stations = stations),
      error: (err) => console.error('Error fetching stations:', err),
    });
  }
  addBicycle(): void {
    
    this.bicycleService.addBicycle(this.newBicycle).subscribe(() => {
      this.router.navigate(['/bicycle']);
    });
  }
  goToBicycleList(): void {
    this.router.navigate(['/bicycle']);
  }
}
