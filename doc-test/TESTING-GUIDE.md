# Testing Guide - Features/Home

## 🚀 Cómo Ejecutar los Tests

### Opción 1: Ejecutar todos los tests
```bash
npm test
```

### Opción 2: Ejecutar solo tests de home feature
```bash
npm test -- src/app/features/home
```

### Opción 3: Ejecutar en modo watch (reinicia automáticamente)
```bash
npm test -- --watch
```

### Opción 4: Ejecutar test específico
```bash
npm test -- home.component.spec
```

---

## 📊 Interpretar los Resultados

### Ejemplo de Output Exitoso
```
✓ Drove-Web  src/app/features/home/components/loader/loader.component.spec.ts (8)
✓ Drove-Web  src/app/features/home/home.component.spec.ts (10)

Test Files  7 passed (7)
     Tests  31 passed (31)
   Duration  2.04s
```

**Significado:**
- ✓ = Test pasó correctamente
- (8), (10) = número de tests en ese archivo
- Duración total de ejecución

---

## 🧪 Estructura de los Tests

Todos los tests siguen este patrón:

```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    // Setup del TestBed
    await TestBed.configureTestingModule({
      imports: [ComponentName],
      providers: [/* ... */],
    }).compileComponents();

    // Crear instancia del componente
    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
  });

  it('should test something', () => {
    // Arrange
    const expectedValue = 'test';
    
    // Act
    component.someMethod();
    
    // Assert
    expect(component.someProperty).toBe(expectedValue);
  });
});
```

---

## ✅ Tests por Componente

### LoaderComponent (8 tests)
Valida:
- ✅ Creación de componente
- ✅ Inicialización de signals
- ✅ Computed properties
- ✅ Renderizado DOM
- ✅ Clases CSS dinámicas

**Para ejecutar solo estos:**
```bash
npm test -- loader.component.spec
```

---

### HomeComponent (10 tests)
Valida:
- ✅ Signals (isScrolled, showLoader, mobileMenuOpen)
- ✅ Métodos (toggleLanguage, toggleMobileMenu, etc.)
- ✅ Inyecciones de servicios
- ✅ Comportamiento asyncrónico

**Para ejecutar solo estos:**
```bash
npm test -- home.component.spec
```

---

### Componentes Presentacionales (2 tests cada uno)
- HeroComponent
- MetricsComponent
- ExperienceComponent

Validan:
- ✅ Creación
- ✅ Renderizado sin errores

---

### ProjectsComponent (3 tests)
Además de lo básico:
- ✅ Inyección de TranslocoService
- ✅ Acceso a servicio

---

### TechStackComponent (4 tests)
Además de lo básico:
- ✅ Inicialización de signal con datos
- ✅ Validación de estructura anidada

---

## 🔍 Debugging de Tests

### Ver más detalles del error
```bash
npm test -- --reporter=verbose
```

### Ejecutar test individual
```bash
npm test -- --grep "should create"
```

### Ejecutar con output expandido
```bash
npm test -- --reporter=detailed
```

---

## 📝 Convenciones de Testing Usadas

### 1. **Signals Testing**
```typescript
// Verificar valor inicial
expect(component.isScrolled()).toBe(false);

// Cambiar valor
component.isScrolled.set(true);
expect(component.isScrolled()).toBe(true);
```

### 2. **Computed Properties**
```typescript
component.progress.set(50);
fixture.detectChanges(); // Importante para computed
expect(component.displayText()).toContain('Loading');
```

### 3. **Inyección de Servicios**
```typescript
const service = TestBed.inject(TranslocoService);
expect(service).toBeTruthy();
```

### 4. **Testing DOM**
```typescript
fixture.detectChanges(); // Renderizar cambios
const element = fixture.nativeElement.querySelector('.loader-overlay');
expect(element).toBeTruthy();
```

### 5. **Testing Async**
```typescript
it('should hide loader after delay', async () => {
  component.onLoaderComplete();
  await new Promise(resolve => setTimeout(resolve, 600));
  expect(component.showLoader()).toBe(false);
});
```

---

## ⚠️ Errores Comunes & Soluciones

### Error: "Cannot find module"
**Causa:** El archivo de test no encuentra el componente o import  
**Solución:** Verificar las rutas relativas en los imports

### Error: "NG0201: No provider found"
**Causa:** Falta configuración de providers en TestBed  
**Solución:** Agregar el provider correspondiente en `beforeEach`

### Error: "Injector has already been destroyed"
**Causa:** Intentar usar inyector después de que el fixture fue destruído  
**Solución:** Hacer cleanup adecuado o usar `fakeAsync`

---

## 📈 Cómo Expandir los Tests

### Agregar más assertions
```typescript
it('should validate complete flow', () => {
  // Más assertions
  expect(component.property1).toBe(value1);
  expect(component.property2).toBe(value2);
  expect(component.property3).toBeTruthy();
});
```

### Agregar tests parametrizados
```typescript
describe.each([
  ['en', 'es'],
  ['es', 'en'],
])('toggleLanguage(%s to %s)', (from, to) => {
  it(`should change from ${from} to ${to}`, () => {
    // test
  });
});
```

### Testing de eventos
```typescript
it('should handle click event', () => {
  const button = fixture.nativeElement.querySelector('button');
  button.click();
  fixture.detectChanges();
  expect(component.clicked).toBe(true);
});
```

---

## 🎯 Mejores Prácticas Aplicadas

✅ **Arrange-Act-Assert**: Estructura clara de tests  
✅ **TestBed.configureTestingModule**: Setup consistente  
✅ **Fixture.detectChanges()**: Sincronización de cambios  
✅ **Async/Await**: Manejo correcto de operaciones asincrónicas  
✅ **Mocking Services**: Aislamiento de dependencias  
✅ **Descriptive Names**: Nombres claros de tests  

---

## 🔗 Referencias Útiles

- [Angular Testing Guide](https://angular.io/guide/testing)
- [Vitest Documentation](https://vitest.dev/)
- [TestBed API](https://angular.io/api/core/testing/TestBed)
- [Angular Signals](https://angular.io/guide/signals)

---

## 📞 Soporte

Si encuentra problemas al ejecutar los tests:

1. Verificar que Node modules está actualizado: `npm install`
2. Limpiar caché: `npm cache clean --force`
3. Reinstalar dependencias: `rm -rf node_modules && npm install`
4. Ejecutar tests nuevamente: `npm test`

---

*Guía de Testing | Driven Web Testing Suite | 2026*
