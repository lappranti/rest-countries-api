import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private themeSubject: BehaviorSubject<string>;
  public theme$: Observable<string>;

  constructor() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) || 'dark';
    this.themeSubject = new BehaviorSubject<string>(savedTheme);
    this.theme$ = this.themeSubject.asObservable();
  }

  getTheme(): Observable<string> {
    return this.theme$;
  }

  setTheme(theme: string): void {
    localStorage.setItem(this.THEME_KEY, theme);
    this.themeSubject.next(theme);
  }
}
