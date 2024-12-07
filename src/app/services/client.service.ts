import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/bicycle';
import { Observable} from 'rxjs';

const BASE_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl: any;
    client: Client[] = [];

    constructor(private http: HttpClient) { }

    getClient(): Observable<Client[]> {
        return this.http.get<Client[]>(`${BASE_URL}/client`);
    }

    updateClient(Client: Client): Observable<Client> {
        return this.http.put<Client>(`${BASE_URL}/client/${Client.id}`, Client);
    }

    deleteClient(ClientId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/client/${ClientId}`);
    }

    addClient(newClient: Client): Observable<Client> {
        const { id, ...ClientWithoutId } = newClient;
        return this.http.post<Client>(`${BASE_URL}/client`, ClientWithoutId);
    }

    getClientById(ClientId: number): Observable<Client> {
        return this.http.get<Client>(`${BASE_URL}/client/${ClientId}`);
    }
}
