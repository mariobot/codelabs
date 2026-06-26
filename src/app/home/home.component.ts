import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HouseLocation } from '../house-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)" >Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filterLocationList" [housingLocation]="housingLocation"></app-housing-location>
    </section>

  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HouseLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filterLocationList: HouseLocation[] = [];

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filterLocationList = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text) this.filterLocationList = this.housingLocationList;

    this.filterLocationList = this.housingLocationList.filter(housingLocation => housingLocation.city.toLowerCase().includes(text.toLowerCase()));
  }
}
