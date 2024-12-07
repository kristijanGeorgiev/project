import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ride } from '../models/bicycle';
import { Observable} from 'rxjs';

const BASE_URL = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class RideService {
    apiUrl: any;
    rides: Ride[] = [];

    constructor(private http: HttpClient) { }

    getRide(): Observable<Ride[]> {
        return this.http.get<Ride[]>(`${BASE_URL}/ride`);
    }

    updateRide(ride: Ride): Observable<Ride> {
        return this.http.put<Ride>(`${BASE_URL}/ride/${ride.id}`, ride);
    }

    deleteRide(rideId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/ride/${rideId}`);
    }

    addRide(newride: Ride): Observable<Ride> {
        const { id, ...rideWithoutId } = newride;
        return this.http.post<Ride>(`${BASE_URL}/ride`, rideWithoutId);
    }

    getRideById(rideId: number): Observable<Ride> {
        return this.http.get<Ride>(`${BASE_URL}/ride/${rideId}`);
    }

}