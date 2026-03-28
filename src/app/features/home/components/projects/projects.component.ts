import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './projects.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent {
  private translocoService = inject(TranslocoService);
}
