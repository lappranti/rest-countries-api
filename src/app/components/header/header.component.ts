import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDark: boolean = false;

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.initialTheme();
  }

  initialTheme() {
    this.themeService.getTheme().subscribe((theme) => (this.isDark = theme));
  }

  handleToggleTheme() {
    this.isDark = !this.isDark;
    //Theme Service
    this.changeTheme();
  }

  changeTheme() {
    this.themeService.changeTheme(this.isDark);
  }

  handleGotoHome() {
    this.router.navigate(['/home']);
  }
}
