import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Bicycle } from '../models/bicycle';
import { BicycleService } from '../services/bicycle.service';
import { Station } from '../models/bicycle';
import { StationService } from '../services/station.service';
@Component({
  selector: 'app-bicycle-edit',
  standalone: false,
  
  templateUrl: './bicycle-edit.component.html',
  styleUrl: './bicycle-edit.component.css'
})
export class BicycleEditComponent implements OnInit{
  bicycle: Bicycle | undefined;
  stations: Station[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bicycleService: BicycleService,
    private stationService: StationService
  ) {}

  ngOnInit(): void { 
    this.getBicycleDetails();
    this.getStations();
  }
  getBicycleDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bicycleService.getBicycleById(+id).subscribe((bicycle) => {
        this.bicycle = bicycle;
      });
    }
  }
  getStations(): void {
    this.stationService.getStation().subscribe((stations) => {
      this.stations = stations;
    });
  }
  saveChanges(): void {
    if (this.bicycle) {
      this.bicycleService.updateBicycle(this.bicycle).subscribe(() => {
        this.router.navigate(['/bicycle']);
      });
    }
  }
  goToBicycleList(): void {
    this.router.navigate(['/bicycle']);
  }
}
