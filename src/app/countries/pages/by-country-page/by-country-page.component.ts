import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  public countries : Country[] = [];

  constructor( private countriesService: CountriesService ) {}

  searchByCountry(term: string){
    // console.log('ByCapitalPage',{term});
    this.countriesService.searchCountry(term).subscribe(countries => this.countries = countries)
  }


}
