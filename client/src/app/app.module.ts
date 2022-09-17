import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TravelPlansComponent } from './travel-plans-list/travel-plans.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  declarations: [
    AppComponent,
    TravelPlansComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoibWloaXJrYWR2ZSIsImEiOiJjbDg1bXc2cGMwNHVpM25taHduY244YmJpIn0.gZpXX0bf2-CDa_PMkQR97g', // Optional, can also be set per map (accessToken input of mgl-map)
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
