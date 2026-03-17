import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './experience.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ExperienceComponent {}
