import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bicycle } from '../models/bicycle';
import { BicycleService } from '../services/bicycle.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bicycle-detail',
  standalone: false,
  
  templateUrl: './bicycle-detail.component.html',
  styleUrl: './bicycle-detail.component.css'
})
export class BicycleDetailComponent implements OnInit{
  bicycle: Bicycle | undefined
  yearsActive: string | undefined;
  constructor(private route: ActivatedRoute, private bicycleService: BicycleService, private router: Router) { }
  ngOnInit(): void {
    this.getBicycleDetails();
  }
  getBicycleDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.bicycleService.getBicycleById(+id).subscribe((bicycle: Bicycle | undefined) => {
        this.bicycle = bicycle;
      });
    }
  }
  goToBicycleList(): void {
    this.router.navigate(['/bicycle']);
  }
}
