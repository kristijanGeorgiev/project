import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Station } from '../models/bicycle';
import { StationService } from '../services/station.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-station-detail',
  standalone: false,
  
  templateUrl: './station-detail.component.html',
  styleUrl: './station-detail.component.css'
})
export class StationDetailComponent implements OnInit{
  station: Station | undefined
  yearsActive: string | undefined;
  constructor(private route: ActivatedRoute, private stationService: StationService, private router: Router) { }
  ngOnInit(): void {
    this.getStationDetails();
  }
  getStationDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.stationService.getStationById(+id).subscribe((station: Station | undefined) => {
        this.station = station;
      });
    }
  }
  goToStationList(): void {
    this.router.navigate(['/station']);
  }
}
