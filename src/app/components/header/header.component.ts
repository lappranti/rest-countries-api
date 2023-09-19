import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDark: string = '';

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.initialTheme();
  }

  initialTheme() {
    this.themeService.getTheme().subscribe((theme) => (this.isDark = theme));
  }

  handleToggleTheme(btnType: string) {
    this.isDark = btnType;

    //Theme Service
    this.changeTheme();
  }

  changeTheme() {
    this.themeService.setTheme(this.isDark);
  }

  handleGotoHome() {
    this.router.navigate(['/home']);
  }
}
