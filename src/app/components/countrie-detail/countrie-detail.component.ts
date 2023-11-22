import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-countrie-detail',
  templateUrl: './countrie-detail.component.html',
  styleUrls: ['./countrie-detail.component.scss'],
})
export class CountrieDetailComponent implements OnInit {
  isDark!: string;
  themeSubscription!: Subscription;

  country!: any;
  countryBasicDetails!: Array<any>;
  bordersCountriesNames!: string[];

  constructor(
    private themeService: ThemeService,
    private countryService: CountriesService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initialisationTheme();

    let countryName: string | null =
      this.activatedRoute.snapshot.paramMap.get('id');

    if (countryName) {
      this.getCountry(countryName);
    }
  }

  initialisationTheme() {
    this.themeSubscription = this.themeService.getTheme().subscribe((theme) => {
      this.isDark = theme;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  getCountry(name: string) {
    this.countryService.getAllCountries().subscribe((res) => {
      this.country = res.filter((c) => c.name === name)[0];
      this.getBasicDetail(this.country);
      this.getBordersCountriesNames(this.country);
    });
  }

  handleGoBack() {
    window.history.back();
  }

  getBasicDetail(country: any) {
    this.countryBasicDetails = [
      {
        title: 'Native Name',
        value: country.nativeName,
      },
      {
        title: 'Population',
        value: this.formatNumber(country.population),
      },
      {
        title: 'Region',
        value: country.region,
      },
      {
        title: 'Sub Region',
        value: country.subregion,
      },
      {
        title: 'Capital',
        value: country.capital,
      },
    ];
  }

  getBordersCountriesNames(country: any) {
    this.bordersCountriesNames = [];

    this.countryService.getAllCountries().subscribe((res) => {
      if (country.borders.length != 0) {
        res.forEach((el) => {
          if (country.borders.includes(el.alpha3Code)) {
            this.bordersCountriesNames.push(el.name);
          }
        });
      } else {
        this.bordersCountriesNames = [''];
      }
    });
  }

  handleShowDetailBorderCountry(name: string) {
    this.getCountry(name);
  }

  //Fonctionde formatage du nombre de population
  formatNumber(num: number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
}
