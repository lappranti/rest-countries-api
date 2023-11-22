import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
})
export class ScrollTopComponent implements OnInit {
  isTheme!: any;
  scrollHeight = 300;

  constructor() {}
  ngOnInit(): void {}

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
