import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  isDark!: boolean;
  themeSubscription!: Subscription;
  countriesSubscription!: Subscription;

  regionList: Array<any> = [
    { id: 'All', name: 'All' },
    { id: 'Africa', name: 'Africa' },
    { id: 'Americas', name: 'Americas' },
    { id: 'Asia', name: 'Asia' },
    { id: 'Europe', name: 'Europe' },
    { id: 'Oceania', name: 'Oceania' },
  ];

  showMenuFilterRegion: boolean = false;
  entrySearch!: string;

  countryLis!: Array<any>;
  copyCountryList!: Array<any>;
  searchList!: Array<any>;

  constructor(
    private themeService: ThemeService,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initialisationTheme();
    this.getAllCountries();

    // Get the button
    let myBtn = document.getElementById('btnGotop');

    // When the user scrolls down 20px from the top of the document, show the button

    window.addEventListener('scroll', function () {
      scrollFunction();
    });

    function scrollFunction() {
      if (myBtn) {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          myBtn.style.display = 'block';
        } else {
          myBtn.style.display = 'none';
        }
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    myBtn?.addEventListener('click', function () {
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  initialisationTheme() {
    this.themeSubscription = this.themeService.getTheme().subscribe((theme) => {
      this.isDark = theme;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.countriesSubscription.unsubscribe();
  }

  onInputChange() {
    if (this.entrySearch.length >= 3) {
      this.searchList = this.countryLis.filter((p) =>
        p.name.toLowerCase().includes(this.entrySearch.toLowerCase())
      );
    } else {
      this.searchList = [];
    }
  }

  handleShowFindedCountry(country: any) {
    this.searchList = [];
    this.entrySearch = '';

    this.gotoDetailCountry(country);
  }

  handleToggleMenu() {
    this.showMenuFilterRegion = !this.showMenuFilterRegion;
  }

  handleSelectedRegion(region: string) {
    this.countryLis = [...this.copyCountryList];
    if (region !== 'All')
      this.countryLis = this.countryLis.filter((p) => p.region == region);
  }

  getAllCountries() {
    this.countriesSubscription = this.countriesService
      .getAllCountries()
      .subscribe((res) => {
        this.countryLis = res;
        this.copyCountryList = res;
      });
  }

  //Fonctionde formatage du nombre de population
  formatNumber(num: number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  gotoDetailCountry(country: any) {
    this.router.navigate(['/country', country.name]);
  }
}
