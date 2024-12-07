import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../models/bicycle';
import { Observable} from 'rxjs';
const BASE_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class StationService {
  apiUrl: any;
    stations: Station[] = [];

    constructor(private http: HttpClient) { }

    getStation(): Observable<Station[]> {
        return this.http.get<Station[]>(`${BASE_URL}/station`);
    }

    updateStation(station: Station): Observable<Station> {
        return this.http.put<Station>(`${BASE_URL}/station/${station.id}`, station);
    }

    deleteStation(stationId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/station/${stationId}`);
    }

    addStation(newstation: Station): Observable<Station> {
        const { id, ...stationWithoutId } = newstation;    
        return this.http.post<Station>(`${BASE_URL}/station`, stationWithoutId);
    }
   
    getStationById(stationId: number): Observable<Station> {
        return this.http.get<Station>(`${BASE_URL}/station/${stationId}`);
    }
}
