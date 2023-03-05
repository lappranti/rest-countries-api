import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http.get<Array<any>>('http://localhost:3000/countryList').pipe(
      map((res) => {
        return res;
      })
    );
  }
}
