import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { TravelPlansService } from '../travel-plans.service';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-travel-plans',
  templateUrl: './travel-plans.component.html',
  styleUrls:['./travel-plans.component.css']
})
export class TravelPlansComponent implements OnInit {
  private map:any;
  private style = 'mapbox://styles/mapbox/streets-v11';
  private lat = 37.75;
  private lng = -122.41;
  public cityName: string = '';
  subject = new Subject()

  travelPlans$: Observable<any[]> = new Observable();
  results$: Observable<any> = new Observable();
  travelPlansByCity$: Observable<any[]> = new Observable();
  timeout: any = null;
  cityLists: any = [];  
  citySearch: string = '';
  travelData: any;
  private readonly searchSubject = new Subject<string | undefined>();
  private searchSubscription?: Subscription;


  constructor(private travelPlansService: TravelPlansService) { }

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchQuery:any) => this.travelPlansService.getPlanById(searchQuery))
    )
    .subscribe((results) => {
      this.cityLists = results['cities']
    });
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
  });
  // Add map controls
  this.map.addControl(new mapboxgl.NavigationControl());
    
  }

  cityClick(city: any) {
    this.cityName = city.name;
    this.travelPlansByCity$ = this.travelPlansService.getPlanByCity(city);
    this.travelPlansByCity$.subscribe((res : any)=>{
      this.travelData = res.data;
      this.cityLists = [];
    })
  }

  onKeySearch(event: any) {
    this.citySearch = event.target.value
    this.searchSubject.next(this.citySearch.trim());
  }
}
