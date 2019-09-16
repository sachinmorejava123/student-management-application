import { Injectable } from '@angular/core';

export interface City {
  value: string;
  viewValue: string;
}

export interface Gender {
  value: string;
  viewValue: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModelService {

   cities: City[]= [
    {value: 'Pune', viewValue: 'Pune'},
    {value: 'Mumbai', viewValue: 'Mumbai'},
    {value: 'Hyderabad', viewValue: 'Hyderabad'},
    {value: 'Delhi', viewValue: 'Delhi'},
    {value: 'Bangalore', viewValue: 'Bangalore'}
  ];
  genders: Gender[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
  ];


  constructor() { }

  getCities(): City[] {
    return this.cities;
  }

  getGenders(): Gender[] {
    return this.genders;
  }
}
