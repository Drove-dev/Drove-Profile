import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  signal,
  AfterViewInit,
  ViewEncapsulation,
  inject,
  NgZone,
  DestroyRef,
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
import { LoaderComponent } from './components/loader/loader.component';

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
    LoaderComponent,
    // ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, AfterViewInit {
  private translocoService = inject(TranslocoService);
  private ngZone = inject(NgZone);
  private destroyRef = inject(DestroyRef);

  isScrolled = signal(false);
  showLoader = signal(true);

  onLoaderComplete() {
    // The loader CSS handles its own 500ms exit fade locally when complete is emitted.
    // We merely unmount it from the DOM after the animation completes.
    setTimeout(() => this.showLoader.set(false), 500);
  }

  toggleLanguage() {
    const currentLang = this.translocoService.getActiveLang();
    const nextLang = currentLang === 'en' ? 'es' : 'en';
    this.translocoService.setActiveLang(nextLang);
  }

  get currentLang() {
    return this.translocoService.getActiveLang();
  }

  constructor() {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      const onScroll = () => {
        const scrolled = window.scrollY > 20;
        if (this.isScrolled() !== scrolled) {
          this.ngZone.run(() => this.isScrolled.set(scrolled));
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  ngAfterViewInit() {
    this.initRevealObserver();
  }

  initRevealObserver() {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      );

      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 150);
  }
}
