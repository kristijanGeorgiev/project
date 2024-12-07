import { Component, OnInit } from '@angular/core';
import { Maintenance } from '../models/bicycle';
import { MaintenanceService } from '../services/maintenance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BicycleService } from '../services/bicycle.service';
import { Bicycle } from '../models/bicycle';
@Component({
  selector: 'app-maintenance-edit',
  standalone: false,
  
  templateUrl: './maintenance-edit.component.html',
  styleUrl: './maintenance-edit.component.css'
})
export class MaintenanceEditComponent implements OnInit{
  maintenance: Maintenance | undefined;
  bicycles: Bicycle[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private maintenanceService: MaintenanceService,
    private bicycleService: BicycleService
  ) {}

  ngOnInit(): void {
    this.getMaintenanceDetails();
    this.getBicycles();
  }
  getMaintenanceDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.maintenanceService.getMaintenanceById(+id).subscribe((maintenance) => {
        this.maintenance = maintenance;
      });
    }
  }
  getMaintenance(): void {
    this.maintenanceService.getMaintenance().subscribe((maintenances) => {
      this.maintenance= this.maintenance;
    });
  }

  getBicycles(): void {
    this.bicycleService.getBicycle().subscribe((bicycles) => {
      this.bicycles = bicycles;
    });
  }

  saveChanges(): void {
    if (this.maintenance) {
      this.maintenanceService.updateMaintenance(this.maintenance).subscribe(() => {
        this.router.navigate(['/maintenance']);
      });
    }
  }
  goToMaintenanceList(): void {
    this.router.navigate(['/maintenance']);
  }
}