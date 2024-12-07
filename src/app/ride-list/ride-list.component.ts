import { Component, OnInit } from '@angular/core';
import { Ride } from '../models/bicycle';
import { CommonModule } from '@angular/common';
import { RideService } from '../services/ride.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../models/bicycle';
import { Bicycle } from '../models/bicycle';
import { ClientService } from '../services/client.service';
import { BicycleService } from '../services/bicycle.service';
@Component({
  selector: 'app-ride-list',
  standalone: false,
  templateUrl: './ride-list.component.html',
  styleUrl: './ride-list.component.css'
})
export class RideListComponent implements OnInit{
  rides: Ride[] = [];
  clients: Client[] = [];
  bicycles: Bicycle[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  dateFilter: string = '';
  clientfilter: string | undefined;
  clientloaded: boolean = false;
  bicyclefilter: string | undefined;
  serialnumberFilter: string = '';
  bicycleloaded: boolean = false;

  constructor(private rideService: RideService, private bicycleService: BicycleService, private clientService: ClientService, private router: Router) {}
  ngOnInit(): void {
    this.getRides();
    this.getClients();
    this.getBicycles();
  }

  sortByID(): void {
    
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
    
    this.rides.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  

  sortByDate(): void {
   
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    
    this.rides.sort((a, b) => {
      const dateA = a.date.toLowerCase(); 
      const dateB = b.date.toLowerCase();

      if (dateA < dateB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (dateA > dateB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0; 
    });
  }

  getRides(): void {
    this.rideService.getRide().subscribe({
      next: (rides) => {
        this.rides = rides;
        console.log(rides);
      },
      error: (err) => console.error('Error fetching rides:', err),
    });
  }

  getBicycles(): void {
    this.bicycleService.getBicycle().subscribe((bicycles) => {
        this.bicycles = bicycles;
        this.bicyclefilter = '';
        this.bicycleloaded = true;
    });
  }

  getClients(): void {
    this.clientService.getClient().subscribe((clients) => {
        this.clients = clients;
        this.clientfilter = '';
        this.clientloaded = true;
    });
  }

  applyFilters(): void {
    this.rideService.getRide().subscribe({
      next: (rides) => {
        this.rides = this.filterRides(rides);
      },
      error: (err) => console.error('Error applying filters:', err),
    });
  }

  filterRides(rides: Ride[]): Ride[] {
    return rides.filter((ride) => 
      this.filterByDate(ride) &&
      this.filterByBicycles(ride) &&
      this.filterByClients(ride)

  );
  }
  filterByDate(ride: Ride): boolean {
    return (
      this.dateFilter === '' ||
      ride.date.toLowerCase().includes(this.dateFilter.toLowerCase())
    );
  }
  filterByBicycles(ride: Ride): boolean {
    return (
      this.bicyclefilter === undefined ||
      this.bicyclefilter === '' ||
      ride.bicycle.serialnumber.toLowerCase().includes(this.bicyclefilter.toLowerCase())
    );
  }
  filterByClients(ride: Ride): boolean {
    return (
      this.clientfilter === undefined ||
      this.clientfilter === '' ||
      ride.client.name.toLowerCase().includes(this.clientfilter.toLowerCase())
    );
  }
  viewRideDetails(ride: Ride): void {
    this.router.navigate(['/ride-detail', ride.id]);
  }

  editRide(ride: Ride): void {
    this.router.navigate(['/ride-edit', ride.id]);
  }

  deleteRide(ride: Ride): void {
    const confirmation = confirm(`Are you sure you want to delete the ride with ID: ${ride.id}?`);
    if (confirmation) {
      this.rideService.deleteRide(ride.id).subscribe({
        next: () => {
          alert(`Ride with ID: ${ride.id} has been successfully deleted.`);
          this.getRides();
        },
        error: (err) => {
          console.error('Error deleting ride:', err);
          alert('An error occurred while trying to delete the ride. Please try again.');
        },
      });
    }
  }
}
