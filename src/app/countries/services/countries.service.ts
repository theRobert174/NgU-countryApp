import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
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

  searchCountryByAlphaCode(term: string) {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${term}`)
    .pipe(
      catchError(() => of([]))
    );
  }
}
