import { Component, OnInit } from '@angular/core';
import { Maintenance, Bicycle } from '../models/bicycle';
import { Router } from '@angular/router';
import { BicycleService } from '../services/bicycle.service';
import { MaintenanceService } from '../services/maintenance.service';

@Component({
  selector: 'app-maintenance-add',
  standalone: false,
  templateUrl: './maintenance-add.component.html',
  styleUrls: ['./maintenance-add.component.css']
})
export class MaintenanceAddComponent implements OnInit {
  newMaintenance: Maintenance = {
    description: '',
    priority: '',
    status: '',
    datescheduled: '',
    completedDate: '',
    notes: '',
    assignedTo: '',
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
    },
    id: 0
  };

  bicycles: Bicycle[] = [];

  constructor(
    private maintenanceService: MaintenanceService,
    private bicycleService: BicycleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the list of bicycles when the component initializes
    this.bicycleService.getBicycle().subscribe({
      next: (bicycles) => (this.bicycles = bicycles),
      error: (err) => console.error('Error fetching bicycles:', err),
    });
  }

  addMaintenance(): void {
    if (!this.newMaintenance.bicycle) {
      alert('Please select a bicycle for the maintenance.');
      return;
    }

    this.maintenanceService.addMaintenance(this.newMaintenance).subscribe({
      next: () => {
        alert('Maintenance record added successfully.');
        this.router.navigate(['/maintenance']);
      },
      error: (err) => {
        console.error('Error adding maintenance:', err);
        alert('An error occurred while adding the maintenance record.');
      }
    });
  }
  goToMaintenanceList(): void {
    this.router.navigate(['/maintenance']);
  }
}
