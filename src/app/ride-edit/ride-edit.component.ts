import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Client, Ride, Bicycle } from '../models/bicycle';
import { FormsModule } from '@angular/forms';
import { RideService } from '../services/ride.service';
import { ClientService } from '../services/client.service';
import { BicycleService } from '../services/bicycle.service';
@Component({
  selector: 'app-ride-edit',
  standalone: false,
  
  templateUrl: './ride-edit.component.html',
  styleUrl: './ride-edit.component.css'
})
export class RideEditComponent implements OnInit{
  ride: Ride| undefined;
  bicycles: Bicycle[] = [];
  clients: Client[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rideService: RideService,
    private bicycleService: BicycleService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getRideDetails();
    this.getClients();
    this.getBicycles();
  }
  getRideDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.rideService.getRideById(+id).subscribe((ride) => {
        this.ride = ride;
      });
    }
  }
  getClients(): void {
    this.clientService.getClient().subscribe((clients) => {
      this.clients = clients;
    });
  }
  getBicycles(): void {
    this.bicycleService.getBicycle().subscribe((bicycles) => {
      this.bicycles = bicycles;
    });
  }
  saveChanges(): void {
    if (this.ride) {
      this.rideService.updateRide(this.ride).subscribe(() => {
        this.router.navigate(['/ride']);
      });
    }
  }
  goToRideList(): void {
    this.router.navigate(['/ride']);
  }
}
