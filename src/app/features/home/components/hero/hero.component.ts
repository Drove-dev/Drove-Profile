import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './hero.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeroComponent {}
