import { Component, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isDark!: string;
  themeSubscription!: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.initialisationTheme();
  }

  initialisationTheme() {
    this.themeSubscription = this.themeService
      .getTheme()
      .subscribe((theme) => (this.isDark = theme));
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
