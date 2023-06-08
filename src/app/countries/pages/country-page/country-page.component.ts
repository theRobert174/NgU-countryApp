import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(private activatedRoute: ActivatedRoute, private countriesService: CountriesService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id))
      ).subscribe(c =>
        {
          if(!c) return this.router.navigateByUrl('');
          return this.country = c;
        }
      );
  }
}
