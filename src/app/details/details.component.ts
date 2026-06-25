import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HouseLocation } from '../house-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
   <article>
    <img class="listing-photo" [src]="housingLocation?.photo" alt="House" />
    <section class="listing-description">
      <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
      <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
    </section>
    <section class="listing-features">
        <h2 class="section-heading">About this hosting</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Have wifi: {{ housingLocation?.wifi }}</li>
          <li>Have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply to live here</h2>
      <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
        <div>
          <label for="firstName">First Name</label>
          <input id="firstName" type="text" formControlName="firstName" />
        </div>
        <div>
          <label for="lastName">Last Name</label>
          <input id="lastName" type="text" formControlName="lastName" />
        </div>
        <div>
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
        </div>
        <button class="primary" type="submit">Apply</button>
      </form>
    </section>
   </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HouseLocation | undefined
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  
  constructor(){
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id'));
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }
}
