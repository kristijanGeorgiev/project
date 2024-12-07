import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ride, Bicycle, Client } from '../models/bicycle';
import { CommonModule } from '@angular/common';
import { RideService } from '../services/ride.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ride-detail',
  standalone: false,
  
  templateUrl: './ride-detail.component.html',
  styleUrl: './ride-detail.component.css'
})
export class RideDetailComponent implements OnInit {
  ride: Ride | undefined
  bicycles: Bicycle[] = [];
  clients: Client[] = [];
  constructor(private route: ActivatedRoute, private rideService: RideService, private router: Router) { }
  ngOnInit(): void {
    this.getRideDetails();
  }
  getRideDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.rideService.getRideById(+id).subscribe((ride:Ride | undefined) => {
        this.ride = ride;
      });
    }
  }
  goToRideList(): void {
    this.router.navigate(['/ride']);
  }
}
