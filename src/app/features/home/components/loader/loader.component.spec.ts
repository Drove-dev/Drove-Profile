import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize progress to 0', () => {
    expect(component.progress()).toBe(0);
  });

  it('should initialize isComplete to false', () => {
    expect(component.isComplete()).toBe(false);
  });

  it('should compute displayText correctly', () => {
    component.progress.set(15);
    expect(component.displayText()).toContain('Initializing');

    component.progress.set(50);
    expect(component.displayText()).toContain('Loading');

    component.progress.set(75);
    expect(component.displayText()).toContain('Building');

    component.progress.set(95);
    expect(component.displayText()).toContain('Almost');

    component.progress.set(100);
    expect(component.displayText()).toContain('Done');
  });

  it('should support output event', () => {
    expect(component.complete).toBeDefined();
  });

  it('should render loader overlay', () => {
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('.loader-overlay');
    expect(overlay).toBeTruthy();
  });

  it('should display progress percentage', () => {
    component.progress.set(45);
    fixture.detectChanges();
    const percent = fixture.nativeElement.querySelector('.loader-percent');
    expect(percent?.textContent).toContain('45');
  });

  it('should apply loader-exit class when complete', () => {
    component.isComplete.set(true);
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('.loader-overlay');
    expect(overlay?.classList.contains('loader-exit')).toBe(true);
  });
});
