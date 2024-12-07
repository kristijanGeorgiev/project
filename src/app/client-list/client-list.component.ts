import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from '../models/bicycle';
import { ClientService } from '../services/client.service';
@Component({
  selector: 'app-client-list',
  standalone: false,
  
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit{
  clients: Client[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  nameFilter: string = '';
  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.getClients();
  }
  sortByID(): void {
    // Toggle sort direction
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    // Sort movies by ID
    this.clients.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  
  sortByName(): void {
    // Toggle sort direction
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    // Sort movies by title
    this.clients.sort((a, b) => {
      const nameA = a.name.toLowerCase(); // Case-insensitive comparison
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0; // Titles are equal
    });
  }
  getClients(): void {
    this.clientService.getClient().subscribe((clients) => {
      this.clients = clients;
      console.log(clients);
    });
  }

  applyFilters(): void {
    this.clientService.getClient().subscribe((clients) => {
      this.clients = this.filterClients(clients);
    });
  }

  filterClients(clients: Client[]): Client[] {
    return clients.filter(clients =>
      this.filterByName(clients)
    );
  }

  filterByName(client: Client): boolean {
    return this.nameFilter === '' || client.name.toLowerCase().includes(this.nameFilter.toLowerCase());
  }

  viewClientDetails(client: Client): void {
    this.router.navigate(['/client-detail', client.id]);
  }

  editClient(client: Client): void {
    this.router.navigate(['/client-edit', client.id]);
  }

  deleteClient(client: Client): void {
    if (confirm('Do you want to delete the client')) {
      this.clientService.deleteClient(client.id).subscribe(() => {
        this.getClients();
      });
    }
  }
}
