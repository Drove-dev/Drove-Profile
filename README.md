# DROVE.dev — Scalable Web Engineering Portfolio

> Personal engineering brand and portfolio of **Eimar Romero**, Senior Fullstack Engineer.  
> Built with Angular 21, Tailwind CSS 4, and a dark-first design system.

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.io)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Transloco](https://img.shields.io/badge/i18n-Transloco-a855f7?style=flat-square)](https://jsverse.github.io/transloco)
[![License](https://img.shields.io/badge/License-MIT-a1a1aa?style=flat-square)](LICENSE)

---

## 📌 Overview

**Drove** is a production-grade personal portfolio designed to communicate senior-level engineering in under 5 seconds. It showcases real-world metrics, featured architecture, professional experience, and a full technical arsenal — all wrapped in a refined dark-mode UI with animated interactions and bilingual support.

The codebase mirrors the same standards applied in production environments: lazy-loaded feature modules, standalone components, reactive state with Angular Signals, component-driven architecture, and a scalable design token system via Tailwind CSS v4.

---

## ✨ Features

- ⚡ **Lazy-loaded routing** — `features/home` loaded on demand for optimal performance
- 🌊 **Three.js animated waves** — immersive WebGL background via `WavesComponent`
- 🌗 **Dark-first design system** — token-based palette using Tailwind v4 `@theme`
- 🌎 **Bilingual EN / ES** — runtime language switching via `@jsverse/transloco`
- 📊 **Impact & Metrics** — quantified results per tech stack (Angular, NestJS, PostgreSQL, Docker)
- 🚀 **Featured Project** — Drove Trace distributed error monitoring system with detailed architecture breakdown
- 💼 **Professional Timeline** — animated vertical timeline with full role history
- 🛠️ **Technical Arsenal** — full tech stack grouped by category with hover micro-interactions
- 📬 **Contact** — EmailJS integration, zero backend required
- 🎯 **Scroll reveal animations** — IntersectionObserver-based `.reveal` system
- 📱 **Fully responsive** — mobile-first, tested across all breakpoints

---

## 🗂️ Project Structure

```
Drove-Web/
├── public/                 # Static assets (Favicons, Images, i18n)
│   ├── assets/
│   │   ├── images/
│   │   └── i18n/           # Translation files (en.json, es.json)
│   ├── favicon.ico
│   └── site.webmanifest
├── src/
│   ├── app/                # Application logic
│   │   ├── features/       # Feature modules (Lazy Loaded)
│   │   │   ├── home/       # Home page components
│   │   │   └── not-found/  # 404 Component
│   │   ├── shared/         # Reusable components & utilities
│   │   │   └── components/visuals/  # Graphical elements (Waves, etc.)
│   │   ├── transloco-loader.ts
│   │   ├── app.config.ts   # Provider configuration (Routes, HttpClient)
│   │   ├── app.routes.ts   # Root routing definition
│   │   ├── app.ts          # Root component (Standalone)
│   │   ├── app.html
│   │   └── app.css
│   ├── main.ts             # Application entry point
│   ├── index.html          # Main HTML (contains SEO Meta Tags)
│   └── styles.css          # Global styles (Tailwind CSS 4)
├── angular.json            # Angular CLI configuration
├── package.json            # npm dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment configuration
```

---

## 🎨 Design System

All design tokens are configured globally in `styles.css` using **Tailwind CSS v4 `@theme`**, making colors, fonts, and gradients available as CSS variables throughout every component — no encapsulation conflicts.

### Color Palette

| Token           | Value     | Role                             |
| --------------- | --------- | -------------------------------- |
| `background`    | `#050505` | App background                   |
| `surface`       | `#0a0a0a` | Cards, inputs, header            |
| `surface-hover` | `#141414` | Interactive card hover           |
| `primary`       | `#38bdf8` | Accent — CTAs, highlights, links |
| `text-main`     | `#ededed` | Primary content text             |
| `text-muted`    | `#a1a1aa` | Secondary text, labels, nav      |
| `border-subtle` | `#1f1f22` | Borders, dividers, timeline      |

### Typography

| Font             | Role                            |
| ---------------- | ------------------------------- |
| `Inter`          | Body text, UI labels            |
| `JetBrains Mono` | Code, badges, terminal elements |

### Global Utility Classes

| Class           | Description                                       |
| --------------- | ------------------------------------------------- |
| `.bg-grid`      | Subtle grid overlay with mask fade                |
| `.tech-card`    | Dark surface card with hover border + glow effect |
| `.reveal`       | Scroll-triggered fade-in + translateY animation   |
| `.header-blur`  | Backdrop blur applied on scroll                   |
| `.dot-flashing` | Pulsing dot loader for async states               |

---

## 🌐 Internationalization — Transloco

Drove supports **English** (default) and **Spanish** via `@jsverse/transloco`. Language toggles at runtime without page reload using the EN/ES button in the header.

Translation files:

```
src/assets/i18n/
├── en.json   ← default
└── es.json
```

To add a new language:

1. Create `src/assets/i18n/fr.json`
2. Register it in `app.config.ts` under `availableLangs`
3. Add the toggle option in `HeaderComponent`

## 📊 Impact & Metrics

Real, quantifiable results reflected in the portfolio:

| Stack          | Result                                                                             |
| -------------- | ---------------------------------------------------------------------------------- |
| **Angular**    | +40% load time improvement via Lazy Loading & Signals. 100+ enterprise components. |
| **NestJS**     | −50% API response time via modular DTOs. 10,000+ concurrent requests handled.      |
| **PostgreSQL** | −30% query time via strategic indexing. Zero data loss in migrations.              |
| **Docker**     | 100% environment parity across Dev / Staging / Prod. 2× faster CI/CD.              |

---

## 🛠️ Tech Stack

**Frontend Architecture**
Angular · TypeScript · RxJS · Tailwind CSS · Bootstrap · Material UI · PrimeNG · NgRx

**Backend Systems**
Node.js · NestJS · Express · Passport · JWT · Bcrypt · Swagger · TypeORM · WebSockets · REST

**Infra & DevOps**
Docker · Vercel

**Data Layer**
PostgreSQL · MySQL

---

## 🏗️ Build & Deployment

```bash
# Production build
ng build --configuration production
# Output → /dist/drove-portfolio
```

---

## 🤝 Contributing

This is a personal portfolio project. Issues and suggestions are welcome via [GitHub Issues](https://github.com/Drove-dev/drove-portfolio/issues).

---

## 📄 License

© 2026 **DROVE.dev** — Architected by Eimar Romero.  
Brand name, logo, and content are property of DROVE.dev.

---

<div align="center">
  <br/>
  <img src="public/assets/images/logo/drove_logo.svg" width="100" alt="Drove Logo" />
  <br/><br/>
  <sub><strong>DROVE.dev</strong> — Architecting resilient software ecosystems with precision and passion.</sub>
  <br/><br/>
  <a href="https://www.linkedin.com/in/eimar-romero/">LinkedIn</a> ·
  <a href="https://github.com/Drove-dev">GitHub</a> ·
  <a href="mailto:hello@drove.dev">hello@drove.dev</a>
</div>
