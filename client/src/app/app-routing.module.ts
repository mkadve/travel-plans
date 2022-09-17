import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelPlansComponent } from './travel-plans-list/travel-plans.component';

const routes: Routes = [
  { path: '', redirectTo: 'travel-plans', pathMatch: 'full' },
  { path: 'travel-plans', component: TravelPlansComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
