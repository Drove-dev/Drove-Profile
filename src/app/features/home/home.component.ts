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
  mobileMenuOpen = signal(false);

  /**
   * Called when loader animation completes (~500ms)
   * Removes loader from DOM after CSS animation finishes
   */
  onLoaderComplete() {
    // Use requestAnimationFrame to sync with animation end
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.showLoader.set(false);
        // Optionally preload 3D scene here if not using @defer
      }, 480); // Slightly less than 500ms for smooth transition
    });
  }

  toggleLanguage() {
    const currentLang = this.translocoService.getActiveLang();
    const nextLang = currentLang === 'en' ? 'es' : 'en';
    this.translocoService.setActiveLang(nextLang);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  get currentLang() {
    return this.translocoService.getActiveLang();
  }

  constructor() {}

  ngOnInit() {
    /**
     * Setup scroll listener outside Angular zone to prevent change detection
     * Uses passive event listener for better scroll performance
     */
    this.ngZone.runOutsideAngular(() => {
      let lastScrollY = window.scrollY;
      let timeoutId: number | null = null;

      const onScroll = () => {
        const currentScrollY = window.scrollY;
        const isScrolled = currentScrollY > 20;

        // Only trigger change detection if scroll threshold changes
        if (Math.abs(currentScrollY - lastScrollY) > 20) {
          // Debounce to avoid excessive change detection
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
          }

          timeoutId = window.setTimeout(() => {
            if (this.isScrolled() !== isScrolled) {
              this.ngZone.run(() => this.isScrolled.set(isScrolled));
            }
            lastScrollY = currentScrollY;
            timeoutId = null;
          }, 50); // 50ms debounce
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
      });
    });
  }

  ngAfterViewInit() {
    // Defer reveal observer to next tick to avoid blocking render
    requestAnimationFrame(() => {
      this.initRevealObserver();
    });
  }

  /**
   * Initialize Intersection Observer for reveal animations
   * Uses requestIdleCallback for non-critical operation
   */
  private initRevealObserver() {
    const revealElements = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[];
    if (revealElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activate = () => entry.target.classList.add('active');

            if (window.requestIdleCallback) {
              window.requestIdleCallback(activate);
            } else {
              activate();
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    // Observe all reveal elements
    revealElements.forEach((el) => {
      observer.observe(el);
    });

    // Fallback: immediately activate any reveal already visible on screen
    requestAnimationFrame(() => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('active');
          observer.unobserve(el);
        }
      });
    });

    // Cleanup observer on destroy
    this.destroyRef.onDestroy(() => {
      observer.disconnect();
    });
  }
}
