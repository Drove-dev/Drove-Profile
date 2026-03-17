import { Component, ViewEncapsulation } from '@angular/core';
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
  categories = [
    {
      key: 'FRONTEND',
      color: '#38bdf8',
      techs: [
        { name: 'Angular' },
        { name: 'TypeScript' },
        { name: 'RxJS' },
        { name: 'Tailwind' },
        { name: 'Bootstrap' },
        { name: 'Material UI' },
        { name: 'PrimeNG' },
        { name: 'NgRx' },
      ],
    },
    {
      key: 'BACKEND',
      color: '#fb7185',
      techs: [
        { name: 'Node.js' },
        { name: 'NestJS' },
        { name: 'Express' },
        { name: 'Passport' },
        { name: 'JWT' },
        { name: 'Bcrypt' },
        { name: 'Swagger' },
        { name: 'TypeORM' },
        { name: 'WebSockets' },
        { name: 'REST' },
      ],
    },
    {
      key: 'INFRA',
      color: '#10b981',
      techs: [{ name: 'Docker' }, { name: 'Vercel' }],
    },
    {
      key: 'DATABASES',
      color: '#6366f1',
      techs: [{ name: 'PostgreSQL' }, { name: 'MySQL' }],
    },
  ];
}
