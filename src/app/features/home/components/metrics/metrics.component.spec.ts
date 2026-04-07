import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MetricsComponent } from './metrics.component';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { provideHttpClient } from '@angular/common/http';

describe('MetricsComponent', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsComponent],
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

    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render without errors', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});
