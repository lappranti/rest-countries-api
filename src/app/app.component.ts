import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    if (!localStorage.getItem('themeCountriesApp')) {
      localStorage.setItem(
        'themeCountriesApp',
        JSON.stringify({ isDark: false })
      );
    }
  }
}
