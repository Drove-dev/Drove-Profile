# Drove - Senior Software Engineer Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/Angular-21.0.0-DD0031?style=for for-the-badge&logo=angular&logoColor=white" alt="Angular 21">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/i18n-Transloco-007ACC?style=for-the-badge" alt="Transloco">
</p>

## 🚀 Overview

**Drove** is a high-performance personal portfolio built with the latest **Angular 21** and **Tailwind CSS 4**. It is designed to showcase the work and expertise of a Senior Engineer focused on building scalable ecosystems. The project features a modern, reactive UI, 3D elements, and robust internationalization support.

> [!IMPORTANT]
> This portfolio is optimized for speed, SEO, and seamless deployment on Vercel.

---

## 📸 Demo

![Portfolio Preview](https://drove.dev/assets/preview.png)
_Live preview available at [drove.dev](https://drove.dev)_

---

## ✨ Features

- **Angular 21 Core:** Leveraging Standalone Components and the new `@angular/build:application` builder for maximum performance.
- **Tailwind CSS 4:** Utilizing the latest CSS-first engine for high-fidelity, maintainable styling.
- **Internationalization (i18n):** Powered by Transloco, supporting seamless switching between English and Spanish.
- **Vercel Optimized:** Includes specific configuration for SPA routing and high-availability deployment.
- **Dynamic UX:**
  - Interactive Hero & Waves components.
  - Responsive project showcase.
  - Optimized contact flow.
  - Custom 404 "Lost in Space" experience.

---

## 🛠️ Project Structure

The project follows a feature-based architecture for better scalability:

```text
src/app/
├── features/
│   ├── home/               # Main portfolio page (lazy-loaded)
│   │   ├── components/     # UI Sections (Hero, Metrics, Tech-Stack, etc.)
│   │   └── home.routes.ts  # Home feature routing
│   └── not-found/          # Custom 404 Error page
├── shared/                 # Reusable components & utilities
│   └── components/visuals/ # Waves and other graphics
├── app.config.ts           # Application providers (Transloco, Routes)
└── app.routes.ts           # Root routing configuration
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js:** v18.x or higher
- **NPM:** v9.x or higher

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/drove-web.git
   cd drove-web
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run start
   ```
   Navigate to `http://localhost:4200/`.

---

## 📦 Build & Deployment

### Production Build

To generate an optimized production bundle:

```bash
npm run build
```

The output will be located in the `dist/drove-web/browser` directory.

### Vercel Deployment

This project is pre-configured for Vercel. Simply push your changes to GitHub/GitLab and connect the repository to Vercel. The `vercel.json` file handles all SPA rewrite rules automatically.

---

## 📬 Contact

- **Website:** [drove.dev](https://drove.dev)
- **LinkedIn:** [LinkedIn](https://linkedin.com/in/eimar-romero)
- **Email:** [hello@drove.dev](mailto:hello@drove.dev)

---

<p align="center">
  Developed with ❤️ using <b>Angular 21</b>
</p>
