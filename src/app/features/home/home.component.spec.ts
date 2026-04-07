import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TranslocoService, provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';
import { vi } from 'vitest';

// Mock THREE.js to avoid WebGL context errors in tests
vi.mock('three', async (importOriginal) => {
  const actual = await importOriginal<typeof import('three')>();
  return {
    ...actual,
    WebGLRenderer: class MockWebGLRenderer {
      setSize = vi.fn();
      setPixelRatio = vi.fn();
      setClearColor = vi.fn();
      clear = vi.fn();
      render = vi.fn();
      dispose = vi.fn();
    },
    Scene: class MockScene {
      add = vi.fn();
      children = [];
    },
    PerspectiveCamera: class MockPerspectiveCamera {
      position = { z: 0 };
    },
  };
});

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let translocoService: TranslocoService;
  let ngZone: NgZone;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        provideTransloco({
          config: {
            availableLangs: ['en', 'es'],
            defaultLang: 'en',
            reRenderOnLangChange: true,
          },
          loader: TranslocoHttpLoader,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    translocoService = TestBed.inject(TranslocoService);
    ngZone = TestBed.inject(NgZone);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isScrolled signal to false', () => {
    expect(component.isScrolled()).toBe(false);
  });

  it('should initialize showLoader signal to true', () => {
    expect(component.showLoader()).toBe(true);
  });

  it('should initialize mobileMenuOpen signal to false', () => {
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should toggle language from en to es', () => {
    translocoService.setActiveLang('en');
    component.toggleLanguage();
    expect(translocoService.getActiveLang()).toBe('es');
  });

  it('should toggle language from es to en', () => {
    translocoService.setActiveLang('es');
    component.toggleLanguage();
    expect(translocoService.getActiveLang()).toBe('en');
  });

  it('should toggle mobile menu state', () => {
    const initialState = component.mobileMenuOpen();
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(!initialState);
  });

  it('should close mobile menu', () => {
    component.mobileMenuOpen.set(true);
    component.closeMobileMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should hide loader after onLoaderComplete', async () => {
    component.showLoader.set(true);
    component.onLoaderComplete();

    await new Promise(resolve => setTimeout(resolve, 600));
    expect(component.showLoader()).toBe(false);
  });
});
