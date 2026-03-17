import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  signal,
  AfterViewInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { WavesComponent } from '../../shared/components/visuals/waves/waves.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    MetricsComponent,
    ExperienceComponent,
    ProjectsComponent,
    TranslocoModule,
    WavesComponent,
    TechStackComponent,
    // ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, AfterViewInit {
  private translocoService = inject(TranslocoService);
  isScrolled = signal(false);

  toggleLanguage() {
    const currentLang = this.translocoService.getActiveLang();
    const nextLang = currentLang === 'en' ? 'es' : 'en';
    this.translocoService.setActiveLang(nextLang);
  }

  get currentLang() {
    return this.translocoService.getActiveLang();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initRevealObserver();
  }

  initRevealObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }
}
