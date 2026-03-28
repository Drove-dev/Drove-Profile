import { Component, OnInit, OnDestroy, signal, computed, ViewEncapsulation, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoaderComponent implements OnInit, OnDestroy {
  progress = signal(0);
  isComplete = signal(false);
  complete = output<void>();

  displayText = computed(() => {
    const p = this.progress();
    if (p < 30)  return 'Initializing...';
    if (p < 60)  return 'Loading modules...';
    if (p < 85)  return 'Building interface...';
    if (p < 100) return 'Almost ready...';
    return 'Done.';
  });

  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    let current = 0;

    this.intervalId = setInterval(() => {
      // Velocidad variable: rápido al inicio, lento al final
      const remaining = 100 - current;
      const step = remaining > 40 ? 4
                 : remaining > 20 ? 2
                 : remaining > 5  ? 1
                 : 0.4;

      current = Math.min(current + step, 100);
      this.progress.set(Math.floor(current));

      if (current >= 100) {
        clearInterval(this.intervalId!);
        setTimeout(() => {
          this.isComplete.set(true);
          this.complete.emit();
        }, 400);
      }
    }, 40);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
