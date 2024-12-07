import { Component, OnInit } from '@angular/core';
import { Ride, Client, Bicycle } from '../models/bicycle';
import { ClientService } from '../services/client.service';
import { BicycleService } from '../services/bicycle.service';
import { Router } from '@angular/router';
import { RideService } from '../services/ride.service';
@Component({
  selector: 'app-ride-add',
  standalone: false,
  templateUrl: './ride-add.component.html',
  styleUrls: ['./ride-add.component.css']
})
export class RideAddComponent implements OnInit {
  newRide: Ride = {
    id: 0,
    start_time: '',
    end_time: '',
    date: '',
    client: {
      id: 0,
      name: '',
      address: '',
      email: '',
      phone: ''
    },
    bicycle: {
      id: 0,
      serialnumber: '',
      model: '',
      status: '',
      station: {
        id: 0,
        location: '',
        capacity: 0,
        address: ''
      }
    }
  };
  clients: Client[] = [];
  bicycles: Bicycle[] = [];

  constructor(
    private rideService: RideService,
    private clientService: ClientService,
    private bicycleService: BicycleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadBicycles();
  }

  loadClients(): void {
    this.clientService.getClient().subscribe({
      next: (clients) => (this.clients = clients),
      error: (err) => console.error('Error fetching clients:', err),
    });
  }

  loadBicycles(): void {
    this.bicycleService.getBicycle().subscribe({
      next: (bicycles) => (this.bicycles = bicycles),
      error: (err) => console.error('Error fetching bicycles:', err),
    });
  }

  addRide(): void {
    this.rideService.addRide(this.newRide).subscribe({
      next: () => {
        alert('Ride added successfully!');
        this.router.navigate(['/ride']);
      },
      error: (err) => {
        console.error('Error adding ride:', err);
        alert('Failed to add ride. Please try again.');
      }
    });
  }
  goToRideList(): void {
    this.router.navigate(['/ride']);
  }
}

