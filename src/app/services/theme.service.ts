import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<any>(this.getLocalStoregde());
  private getLocalStoregde(): boolean {
    return JSON.parse(localStorage.getItem('themeCountriesApp') || '').isDark;
  }

  private setLocalstoradge(theme: boolean) {
    localStorage.setItem(
      'themeCountriesApp',
      JSON.stringify({ isDark: theme })
    );
  }

  getTheme() {
    return this.themeSubject.asObservable();
  }

  changeTheme(theme: boolean) {
    this.themeSubject.next(theme);
    this.setLocalstoradge(theme);
  }
}
