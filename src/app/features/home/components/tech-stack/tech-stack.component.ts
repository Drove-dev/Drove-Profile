import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TechStackComponent {
  categories = signal([
    {
      key: 'FRONTEND',
      color: '#38bdf8',
      label: 'Primary stack',
      techs: [
        { name: 'Angular',      tag: 'Framework' },
        { name: 'TypeScript',   tag: 'Language'  },
        { name: 'RxJS',         tag: 'Reactive'  },
        { name: 'Tailwind',     tag: 'Styling'   },
        { name: 'Bootstrap',    tag: 'Styling'   },
        { name: 'Material UI',  tag: 'UI Lib'    },
        { name: 'PrimeNG',      tag: 'UI Lib'    },
        { name: 'NgRx',         tag: 'State'     },
      ],
    },
    {
      key: 'BACKEND',
      color: '#fb7185',
      label: 'Core stack',
      techs: [
        { name: 'Node.js',     tag: 'Runtime'   },
        { name: 'NestJS',      tag: 'Framework' },
        { name: 'Express',     tag: 'Framework' },
        { name: 'Passport',    tag: 'Auth'      },
        { name: 'JWT',         tag: 'Auth'      },
        { name: 'Bcrypt',      tag: 'Security'  },
        { name: 'Swagger',     tag: 'Docs'      },
        { name: 'TypeORM',     tag: 'ORM'       },
        { name: 'WebSockets',  tag: 'Realtime'  },
        { name: 'REST',        tag: 'API'        },
      ],
    },
    {
      key: 'INFRA',
      color: '#10b981',
      label: 'Infra',
      techs: [
        { name: 'Docker',  tag: 'Container' },
        { name: 'Vercel',  tag: 'Deploy'    },
      ],
    },
    {
      key: 'DATABASES',
      color: '#6366f1',
      label: 'Databases',
      techs: [
        { name: 'PostgreSQL',  tag: 'Relational' },
        { name: 'MySQL',       tag: 'Relational' },
      ],
    },
  ]);

  maxTechs = computed(() =>
    Math.max(...this.categories().map(c => c.techs.length))
  );
}
