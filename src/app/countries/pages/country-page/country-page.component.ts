import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.countriesService.searchCountryByAlphaCode(id).subscribe(c => console.log(c));
    })
  }
}
