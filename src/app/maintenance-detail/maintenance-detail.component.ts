import { Component, OnInit } from '@angular/core';
import { Maintenance } from '../models/bicycle';
import { FormsModule } from '@angular/forms';
import { MaintenanceService } from '../services/maintenance.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-maintenance-detail',
  standalone: false,
  
  templateUrl: './maintenance-detail.component.html',
  styleUrl: './maintenance-detail.component.css'
})
export class MaintenanceDetailComponent implements OnInit{
  maintenance: Maintenance | undefined
  constructor(private route: ActivatedRoute, private maintenanceService: MaintenanceService, private router: Router) { }
  ngOnInit(): void {
    this.getMaintenanceDetails();
  }
  getMaintenanceDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.maintenanceService.getMaintenanceById(+id).subscribe((maintenance: Maintenance | undefined) => {
        this.maintenance = maintenance;
      });
    }
  }
  goToMaintenanceList(): void {
    this.router.navigate(['/maintenance']);
  }
}
