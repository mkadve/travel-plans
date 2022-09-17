import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelPlansService {
  private url = 'http://localhost:8080';
  private travelPlans$: Subject<any[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  getPlanById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/travel-plans/search/${id}`);
  }

  getPlanByCity(body: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/travel-plans/plans`, body);
  }
}
