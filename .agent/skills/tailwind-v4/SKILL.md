---
name: tailwind-v4-rules
description: Strict rules and best practices for Tailwind CSS 4.1.12.
---

## Tailwind 4.1.12 Best Practices

- **CSS-First Configuration:** Use the new `@theme` directive directly in your CSS file. Avoid using `tailwind.config.js` unless complex integrations are strictly required.
- **Dark Mode:** Always implement the `dark:` modifier on all UI elements to guarantee a fully supported dark theme aesthetic.
- **Native Variables:** Leverage the native CSS variables that v4 generates by default instead of constantly using arbitrary values.
- **Opacity & Syntax:** Use the modern opacity syntax (e.g., `bg-blue-500/50`) and only abstract repetitive classes when the component is highly reusable.
