import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http.get<Array<any>>('https://restcountries.com/v3.1/all').pipe(
      map((res) => {
        console.log(res.length);

        return res;
      })
    );
  }
}
