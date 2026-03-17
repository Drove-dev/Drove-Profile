import { Component, ViewEncapsulation, signal, inject } from '@angular/core';
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
  isExplainingProject = signal(false);
  showAiExplanation = signal(false);
  aiExplanationText = signal('');

  constructor() {}

  async explainProjectWithAI() {
    if (this.isExplainingProject()) return;

    this.isExplainingProject.set(true);
    this.showAiExplanation.set(true);
    
    this.aiExplanationText.set(this.translocoService.translate('PROJECTS.AI_EXPLAIN_LOADING'));

    // Simulate analysis
    setTimeout(() => {
      const explanation = this.translocoService.translate('PROJECTS.AI_EXPLAIN_CONTENT');
      
      this.aiExplanationText.set(explanation);
      this.isExplainingProject.set(false);
    }, 1500);
  }
}
