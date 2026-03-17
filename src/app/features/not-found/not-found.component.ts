import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-4">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-pulse">
          404
        </h1>
        <h2 class="text-3xl font-semibold mb-6">Página no encontrada</h2>
        <p class="text-gray-400 mb-8 max-w-md mx-auto">
          Parece que te has perdido en el ecosistema. La página que buscas no existe o ha sido movida.
        </p>
        <a
          routerLink="/"
          class="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/10"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NotFoundComponent {}
