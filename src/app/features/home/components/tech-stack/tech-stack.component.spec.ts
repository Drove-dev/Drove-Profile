import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TechStackComponent } from './tech-stack.component';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { provideHttpClient } from '@angular/common/http';

describe('TechStackComponent', () => {
  let component: TechStackComponent;
  let fixture: ComponentFixture<TechStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechStackComponent],
      providers: [
        provideHttpClient(),
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

    fixture = TestBed.createComponent(TechStackComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize categories signal', () => {
    expect(component.categories()).toBeDefined();
    expect(component.categories().length).toBeGreaterThan(0);
  });

  it('should have FRONTEND category', () => {
    const frontend = component.categories().find(cat => cat.key === 'FRONTEND');
    expect(frontend).toBeDefined();
    expect(frontend?.techs.length).toBeGreaterThan(0);
  });

  it('should render without errors', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});
