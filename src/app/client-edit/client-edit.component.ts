import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { FormsModule } from '@angular/forms';
import { Client } from '../models/bicycle';
@Component({
  selector: 'app-client-edit',
  standalone: false,
  
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css'
})
export class ClientEditComponent implements OnInit{
  client: Client | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getClientDetails();
    this.getClients();
  }
  getClientDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.clientService.getClientById(+id).subscribe((client) => {
        this.client = client;
      });
    }
  }
  getClients(): void {
    this.clientService.getClient().subscribe((clients) => {
      this.client = this.client;
    });
  }
  saveChanges(): void {
    if (this.client) {
      this.clientService.updateClient(this.client).subscribe(() => {
        this.router.navigate(['/client']);
      });
    }
  }
  goToClientList(): void {
    this.router.navigate(['/client']);
  }
}
