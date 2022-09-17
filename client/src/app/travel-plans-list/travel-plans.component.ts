import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  travelPlans$: Observable<any[]> = new Observable();
  travelPlansByCity$: Observable<any[]> = new Observable();
  timeout: any = null;
  cityLists: any = [];
  citySearch: string = '';

  constructor(private travelPlansService: TravelPlansService) { }

  ngOnInit(): void {
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
    this.travelPlansByCity$ = this.travelPlansService.getPlanByCity(city);
    this.travelPlansByCity$.subscribe((res : any)=>{
      console.log(res);
    })
  }

  onKeySearch(event: any) {
    this.citySearch = event.target.value
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.getPlanById(event.target.value);
      }
    }, 1000);
  }

  private getPlanById(value: any): void {
    this.travelPlans$ = this.travelPlansService.getPlanById(value);
    this.travelPlans$.subscribe((res : any)=>{
      this.cityLists = res['cities'];
      console.log('this.cityLists',this.cityLists,res,res.cities)
    })
  }
}
