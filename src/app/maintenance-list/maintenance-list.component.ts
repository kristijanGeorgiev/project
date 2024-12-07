import { Component, OnInit } from '@angular/core';
import { Maintenance } from '../models/bicycle';
import { MaintenanceService } from '../services/maintenance.service';
import { Bicycle } from '../models/bicycle';
import { BicycleService } from '../services/bicycle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-maintenance-list',
  standalone: false,
  
  templateUrl: './maintenance-list.component.html',
  styleUrl: './maintenance-list.component.css'
})
export class MaintenanceListComponent implements OnInit{
  maintenances: Maintenance[] = [];
  bicycles: Bicycle[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  descriptionFilter: string = '';
  bicyclefilter: string | undefined;
  serialnumberFilter: string = '';
  bicycleloaded: boolean = false;

  constructor(private maintenanceService: MaintenanceService, private bicycleService: BicycleService, private router: Router) {}
  ngOnInit(): void {
    this.getMaintenances();
    this.getBicycles();
  }

  sortByID(): void {
    
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
    
    this.maintenances.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  

  sortByDescription(): void {
    
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    
    this.maintenances.sort((a, b) => {
      const descriptionA = a.description.toLowerCase();
      const descriptionB = b.description.toLowerCase();

      if (descriptionA < descriptionB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (descriptionA > descriptionB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  

  getMaintenances(): void {
    this.maintenanceService.getMaintenance().subscribe({
      next: (maintenances) => {
        this.maintenances = maintenances;
        console.log(maintenances);
      },
      error: (err) => console.error('Error fetching maintenances:', err),
    });
  }
  getBicycles(): void {
    this.bicycleService.getBicycle().subscribe((bicycles) => {
        this.bicycles = bicycles;
        this.bicyclefilter = '';
        this.bicycleloaded = true;
    });
  }

  applyFilters(): void {
    this.maintenanceService.getMaintenance().subscribe({
      next: (maintenances) => {
        this.maintenances = this.filterMaintenances(maintenances);
      },
      error: (err) => console.error('Error applying filters:', err),
    });
  }

  filterMaintenances(maintenances: Maintenance[]): Maintenance[] {
    return maintenances.filter(maintenance =>
      this.filterByDescription(maintenance) &&
      this.filterByBicycles(maintenance)
    );
  }
  filterByBicycles(maintenance: Maintenance): boolean {
    return (
      this.bicyclefilter === undefined ||
      this.bicyclefilter === '' ||
      maintenance.bicycle.serialnumber.toLowerCase().includes(this.bicyclefilter.toLowerCase())
    );
  }
  filterByDescription(maintenance: Maintenance): boolean {
    return this.descriptionFilter === '' || maintenance.description.toLowerCase().includes(this.descriptionFilter.toLowerCase());
  }

  filterBySerialNumber(bicycle: Bicycle): boolean {
    return this.serialnumberFilter === '' || bicycle.serialnumber.toLowerCase().includes(this.serialnumberFilter.toLowerCase());
  }

  viewMaintenanceDetails(maintenance: Maintenance): void {
    this.router.navigate(['/maintenance-detail', maintenance.id]);
  }

  editMaintenance(maintenance: Maintenance): void {
    this.router.navigate(['/maintenance-edit', maintenance.id]);
  }

  deleteMaintenance(maintenance: Maintenance): void {
    const confirmation = confirm(`Do you want to delete this maintenance with ID: ${maintenance.id}?`);
    
    if (confirmation) {
      this.maintenanceService.deleteMaintenance(maintenance.id).subscribe({
        next: () => {
          alert('Maintenance deleted successfully.');
          this.getMaintenances();
        },
        error: (err) => {
          console.error('Error deleting maintenance:', err);
          alert('An error occurred while deleting the maintenance. Please try again.');
        },
      });
    }
  }
}
