import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './metrics.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MetricsComponent {}
