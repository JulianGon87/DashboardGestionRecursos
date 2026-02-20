# Dashboard de Gestión de Recursos (Migrado a Vue.js)

Este proyecto es una aplicación web de gestión de inventario desarrollada originalmente en Vanilla JS como ejercicio práctico, y ahora **migrada a Vue.js 3 + Vite** para el Módulo 6 del curso de Frontend. Permite a los usuarios administrar recursos tecnológicos y de oficina a través de una interfaz moderna y responsiva.

## 🚀 Características

- **Gestión de Recursos**: Formulario para agregar nuevos recursos con validación de datos (Nombre, Categoría, Cantidad, Valor).
- **Inventario en Tiempo Real**: Visualización de la lista de recursos actuales en una tabla organizada con reactividad de Vue.
- **Estadísticas Dinámicas**: Cálculo automático de métricas clave:
  - Cantidad de items por categoría (Hardware, Software, Mobiliario, Insumo).
  - Valor monetario total del inventario.
- **Persistencia de Datos**: Integración con MockAPI (fetch) integrado a los hooks de ciclo de vida de Vue para almacenar, recuperar y eliminar datos.
- **Diseño UI/UX Moderno**:
  - Estilo "Glassmorphism" (paneles translúcidos).
  - Diseño totalmente responsivo (adaptable a escritorio, tablet y móvil).
  - Single Page Application (SPA) con navegación mediante Vue Router.

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3** (Composition API `<script setup>`)
- **Vite** como empaquetador
- **Vue Router 4** para la navegación
- **CSS3** (Variables CSS, Flexbox, Grid y Glassmorphism)
- Lógica JS encapsulada en componentes y reactividad (`ref`, `computed`).

## 📋 Estructura del Proyecto

```
/
├── public/                # Archivos estáticos
├── src/
│   ├── components/        # Componentes Vue (Sidebar, Topbar)
│   ├── router/            # Configuración de Vue Router
│   ├── views/             # Vistas de la aplicación (DashboardView, etc)
│   ├── App.vue            # Componente raíz
│   ├── main.js            # Punto de entrada de la aplicación
│   └── style.css          # Estilos globales de CSS
├── index.html
├── package.json
└── vite.config.js
```

---
Desarrollado para el portafolio del Módulo 6 - SENCE Frontend.
