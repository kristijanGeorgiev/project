import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Maintenance } from '../models/bicycle';
import { Observable} from 'rxjs';
const BASE_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  apiUrl: any;
    maintenances: Maintenance[] = [];

    constructor(private http: HttpClient) { }

    getMaintenance(): Observable<Maintenance[]> {
        return this.http.get<Maintenance[]>(`${BASE_URL}/maintenance`);
    }

    updateMaintenance(Maintenance: Maintenance): Observable<Maintenance> {
        return this.http.put<Maintenance>(`${BASE_URL}/maintenance/${Maintenance.id}`, Maintenance);
    }

    deleteMaintenance(MaintenanceId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/maintenance/${MaintenanceId}`);
    }

    addMaintenance(newMaintenance: Maintenance): Observable<Maintenance> {
        const { id, ...MaintenanceWithoutId } = newMaintenance;
        return this.http.post<Maintenance>(`${BASE_URL}/maintenance`, MaintenanceWithoutId);
    }

    getMaintenanceById(MaintenanceId: number): Observable<Maintenance> {
        return this.http.get<Maintenance>(`${BASE_URL}/maintenance/${MaintenanceId}`);
    }
}
