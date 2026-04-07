import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { TranslocoService, provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { provideHttpClient } from '@angular/common/http';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let translocoService: TranslocoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
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

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    translocoService = TestBed.inject(TranslocoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have access to TranslocoService', () => {
    expect(translocoService).toBeTruthy();
  });

  it('should render without errors', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});
