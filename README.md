# Dashboard de Gestión de Recursos (Vue.js + Vuex + Vitest)

Este proyecto es una aplicación web de gestión de inventario desarrollada originariamente en Vanilla JS, migrada a **Vue.js 3 + Vite** para el Módulo 6, y ampliada con **Autenticación, Manejo de Estado Global (Vuex) y Pruebas Unitarias (Vitest)** para el Módulo 7 del curso de Frontend.

## 🚀 Características

- **Autenticación de Usuarios**: Sistema de registro y login (con datos persistidos en memoria local) protegido por barreras de navegación (`nav guards`) para proteger vistas privadas.
- **Estado Global Compartido**: Integración de **Vuex** para manejar la sesión del usuario activo y llevar una métrica de visitas al dashboard por perfil.
- **Gestión de Recursos**: Formulario para agregar nuevos recursos con validación de datos (Nombre, Categoría, Cantidad, Valor), soportados por una REST API simulada en *MockAPI*.
- **Inventario Dinámico**: Visualización de la lista de recursos actuales en una tabla con reactividad, e inferencia de estadísticas automáticas por clase de hardware, software, inmobiliario, e insumos.
- **Diseño UI/UX Moderno**:
  - Estilo "Glassmorphism" con paneles translúcidos.
  - Diseño responsivo adaptativo tanto para interfaces de escritorio como web móvil.
  - Single Page Application (SPA) con ruteo gestionado mediante Vue Router.
- **Pruebas Unitarias**: Entorno configurado con *Vitest* y *Vue Test Utils* testeando el correcto ensamblaje y comportamiento del sistema de login, registro, y despliegue del Sidebar.

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3** (Composition API `<script setup>`)
- **Vite** (Configuración de build y servidor de alto rendimiento)
- **Vue Router 4** (Navegación y protección de rutas)
- **Vuex 4** (Gestor y almacén de datos de estado)
- **Vitest & @vue/test-utils** (Módulo de ejecución de Pruebas Unitarias con JSDOM)
- **CSS3** (Variables CSS, Flexbox, Grid y Animaciones)

## 📋 Comandos del Proyecto

Para levantar el servidor local de desarrollo con HMR:
```bash
npm run dev
```

Para compilar el proyecto a producción:
```bash
npm run build
```

Para correr la suite de pruebas unitarias estructuradas:
```bash
npm run test:unit
# Para modo on-watch puedes utilizar: npx vitest
```

---
Desarrollado para el portafolio del Módulo 6 y Módulo 7 - SENCE Frontend.
