import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../models/bicycle';
import { ClientService } from '../services/client.service';
@Component({
  selector: 'app-client-add',
  standalone: false,
  
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.css'
})
export class ClientAddComponent {
  newClient: Client = {
    id: 0,
    name: '',
    address: '',
    email: '',
    phone: ''
  };

  constructor(private clientService: ClientService, private router: Router) {}

  addClient(): void {
    this.clientService.addClient(this.newClient).subscribe(() => {
      this.router.navigate(['/client']);
    });
  }
  goToClientList(): void {
    this.router.navigate(['/client']);
  }
}
