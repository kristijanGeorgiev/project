import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Client } from '../models/bicycle';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-client-detail',
  standalone: false,
  
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent implements OnInit{
  client: Client | undefined
  yearsActive: string | undefined;
  constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router) { }
  ngOnInit(): void {
    this.getClientDetails();
  }
  getClientDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.clientService.getClientById(+id).subscribe((client: Client | undefined) => {
        this.client = client;
      });
    }
  }
  goToClientList(): void {
    this.router.navigate(['/client']);
  }
}
