import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'
  constructor( private http: HttpClient) { }

  searchCapital(term: string) : Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${term}`)
    .pipe(
      catchError(() => of([]))
    );
  }

  searchCountry(term: string) {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${term}`)
    .pipe(
      catchError(() => of([]))
    );
  }

  searchRegion(term: string) {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${term}`)
    .pipe(
      catchError(() => of([]))
    );
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
