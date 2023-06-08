import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of, delay, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { cacheStore } from '../interfaces/cacheStore.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  public cacheStore: cacheStore = {
    byCapital:    { term: '', countries: [ ]},
    byCountries:  { term: '', countries: [ ]},
    byRegion:     { region: '', countries: [ ]},
  }
  constructor( private http: HttpClient) { }

  private getCountriesRequest(url : string) : Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe( catchError( () => of([]))/*, delay( 2000 ) */);
  }

  searchCapital(term: string) : Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(tap( countries => this.cacheStore.byCapital = { term, countries }));
  }

  searchCountry(term: string) {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(tap( countries => this.cacheStore.byCountries = { term, countries }));
  }

  searchRegion(region: Region) {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(tap( countries => this.cacheStore.byRegion = { region, countries }));
  }

  searchCountryByAlphaCode(code: string) : Observable<Country | null> {

    const url = `${this.apiUrl}/alpha/${code}`

    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(() => of(null))
    );
  }
}
