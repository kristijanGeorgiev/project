import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bicycle } from '../models/bicycle';
import { Observable} from 'rxjs';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {

  apiUrl: any;
    bicycles: Bicycle[] = [];

    constructor(private http: HttpClient) { }

    getBicycle(): Observable<Bicycle[]> {
        return this.http.get<Bicycle[]>(`${BASE_URL}/bicycle`);
    }

    updateBicycle(Bicycle: Bicycle): Observable<Bicycle> {
        return this.http.put<Bicycle>(`${BASE_URL}/bicycle/${Bicycle.id}`, Bicycle);
    }

    deleteBicycle(BicycleId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/bicycle/${BicycleId}`);
    }

    addBicycle(newBicycle: Bicycle): Observable<Bicycle> {
        const { id, ...BicycleWithoutId } = newBicycle;
        return this.http.post<Bicycle>(`${BASE_URL}/bicycle`, BicycleWithoutId);
    }

    getBicycleById(BicycleId: number): Observable<Bicycle> {
        return this.http.get<Bicycle>(`${BASE_URL}/bicycle/${BicycleId}`);
    }

}
