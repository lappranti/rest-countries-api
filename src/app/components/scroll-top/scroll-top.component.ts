import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
})
export class ScrollTopComponent implements OnInit {
  isTheme!: any;
  scrollHeight = 300;

  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    this.themeService.getTheme().subscribe((resp: any) => {
      // this.isTheme = resp;
      console.log(resp);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const button = document.querySelector('.scroll-top-button') as HTMLElement;

    if (window.scrollY >= this.scrollHeight) {
      button.classList.remove('hidden');
    } else {
      button.classList.add('hidden');
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
