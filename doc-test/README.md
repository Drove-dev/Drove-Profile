# 📋 Documentación de Testing - Features/Home

Esta carpeta contiene la documentación completa de los tests implementados para el feature `home` de la aplicación Drove-Web.

## 📁 Archivos Incluidos

### 1. **TEST-REPORT.md** 📊
Reporte completo y detallado de los tests ejecutados.

**Contenido:**
- Resumen ejecutivo con métricas
- Resultados por componente
- Descripción de cada test
- Cobertura estimada
- Configuración de tests
- Próximos pasos recomendados

**Cuándo leerlo:** Para obtener una visión general y entender qué se probó.

---

### 2. **test-results.json** 🔍
Archivo JSON estructurado con los resultados de los tests.

**Contenido:**
- Metadatos de ejecución
- Lista completa de componentes
- Estado individual de cada test
- Configuración del framework de testing

**Cuándo leerlo:** Para análisis automatizado o integración con CI/CD.

---

### 3. **TESTING-GUIDE.md** 🧪
Guía práctica para ejecutar, entender y expandir los tests.

**Contenido:**
- Comandos para ejecutar tests
- Cómo interpretar resultados
- Estructura general de tests
- Patrones de testing usados
- Solución de problemas comunes
- Mejores prácticas

**Cuándo leerlo:** Antes de ejecutar tests o cuando necesites debugging.

---

## 🎯 Resumen Rápido

| Métrica | Valor |
|---------|-------|
| **Componentes Testeados** | 7 |
| **Tests Totales** | 31 |
| **Estado** | ✅ Todos Pasando |
| **Cobertura** | ~75% |

---

## ✅ Componentes Cubiertos

1. **HomeComponent** (10 tests) - Componente padre principal
2. **LoaderComponent** (8 tests) - Loader animado con signals
3. **TechStackComponent** (4 tests) - Stack de tecnologías
4. **ProjectsComponent** (3 tests) - Proyectos destacados
5. **HeroComponent** (2 tests) - Sección héroe
6. **MetricsComponent** (2 tests) - Métricas/Impacto
7. **ExperienceComponent** (2 tests) - Experiencia profesional

---

## 🚀 Inicio Rápido

### 1. Ejecutar todos los tests
```bash
npm test
```

### 2. Ver resultados en tiempo real
```bash
npm test -- --watch
```

### 3. Ejecutar solo tests de home
```bash
npm test -- src/app/features/home
```

---

## 📖 Lectura Recomendada

### Para Administradores/PMs
→ Lee [TEST-REPORT.md](./TEST-REPORT.md) primero  
Obtén resumen de cobertura y estado

### Para Desarrolladores
→ Lee [TESTING-GUIDE.md](./TESTING-GUIDE.md)  
Aprende cómo ejecutar y extender tests

### Para CI/CD
→ Usa [test-results.json](./test-results.json)  
Integra resultados en pipelines

---

## 🔄 Flujo de Actualización de Tests

Cuando agregues nuevas funcionalidades al feature `home`:

1. **Actualiza el componente** - Agregar código nuevo
2. **Escribe test para la nueva funcionalidad** - Crear `*.spec.ts`
3. **Ejecuta los tests** - `npm test` 
4. **Actualiza documentación** - Modifica archivos en `doc-test/`

---

## 📊 Estructura de Tests

```
features/home/
├── home.component.spec.ts (10 tests)
├── components/
│   ├── hero/hero.component.spec.ts (2 tests)
│   ├── metrics/metrics.component.spec.ts (2 tests)
│   ├── experience/experience.component.spec.ts (2 tests)
│   ├── projects/projects.component.spec.ts (3 tests)
│   ├── loader/loader.component.spec.ts (8 tests)
│   ├── tech-stack/tech-stack.component.spec.ts (4 tests)
│   └── contact/ (⚠️ OMITIDO - sin tests)
```

---

## ⚙️ Configuración

### Framework
- **Testing Framework:** Vitest v4.1.0
- **Angular Version:** 21.0.0
- **Assertion Library:** Vitest expect()
- **Test Bed:** Angular TestBed

### Dependencias
```json
{
  "vitest": "^4.0.8",
  "@angular/core": "^21.0.0",
  "@jsverse/transloco": "^8.2.1"
}
```

---

## 🎓 Patrones de Testing Utilizados

✅ **Unit Testing** - Pruebas individuales de componentes  
✅ **Signal Testing** - Validación de Angular Signals  
✅ **Computed Properties** - Testing de propiedades calculadas  
✅ **Service Injection** - Mock de servicios con TestBed  
✅ **DOM Rendering** - Validación de elementos renderizados  
✅ **Async Testing** - Manejo de operaciones asincrónicas  

---

## 📈 Métricas de Cobertura

```
HomeComponent..................75%
LoaderComponent.................90%
TechStackComponent..............85%
ProjectsComponent...............80%
HeroComponent...................85%
MetricsComponent................85%
ExperienceComponent.............85%
─────────────────────────────────
Promedio Estimado...............75%
```

---

## 🛠️ Troubleshooting

### Los tests no ejecutan
```bash
# Instalar dependencias
npm install

# Limpiar caché
npm cache clean --force

# Reintentar
npm test
```

### Errores de búferes agotados
```bash
# Ejecutar con más memoria
NODE_OPTIONS=--max-old-space-size=4096 npm test
```

### Tests lentamente
```bash
# Ejecutar solo tests de home
npm test -- src/app/features/home

# Ejecutar test específico
npm test -- home.component.spec
```

---

## 🔗 Enlaces Útiles

- [Angular Testing Docs](https://angular.io/guide/testing)
- [Vitest Official Docs](https://vitest.dev/)
- [TestBed API Reference](https://angular.io/api/core/testing/TestBed)
- [Driven-Web Repository](https://github.com/Drove-dev/drove-web)

---

## 📋 Checklist de Mantenimiento

- [ ] Ejecutar tests semanalmente
- [ ] Revisar cobertura de nuevas funcionalidades
- [ ] Actualizar tests cuando se cambien componentes
- [ ] Documentar nuevos patrones de testing
- [ ] Limpiar tests obsoletos

---

## 👥 Contribuciones

Para agregar nuevos tests:

1. Crea archivo `*.spec.ts` para cada componente
2. Sigue el patrón: `describe` → `beforeEach` → `it`
3. Usa descriptiones claras de tests
4. Actualiza documentación en `doc-test/`

---

## 📅 Historial

| Fecha | Acción | Detalles |
|-------|--------|----------|
| 2026-04-07 | Implementación Inicial | 31 tests creados, 7 componentes |
| - | - | - |

---

## 📧 Contacto & Soporte

Para preguntas sobre los tests:
- Revisar [TESTING-GUIDE.md](./TESTING-GUIDE.md)
- Revisar [TEST-REPORT.md](./TEST-REPORT.md)
- Consultar código fuente en `src/app/features/home/`

---

**Estado:** ✅ Completo y Operativo  
**Última Actualización:** 7 de Abril, 2026  
**Versión:** 1.0.0

---

*Documentación de Driven Web Testing - Features/Home Suite*
