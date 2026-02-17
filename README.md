# Dashboard de Gestión de Recursos

Este proyecto es una aplicación web de gestión de inventario desarrollada como ejercicio práctico final para el Módulo 4 del curso de Frontend. Permite a los usuarios administrar recursos tecnológicos y de oficina a través de una interfaz moderna y responsiva.

## 🚀 Características

- **Gestión de Recursos**: Formulario para agregar nuevos recursos con validación de datos (Nombre, Categoría, Cantidad, Valor).
- **Inventario en Tiempo Real**: Visualización de la lista de recursos actuales en una tabla organizada.
- **Estadísticas Dinámicas**: Cálculo automático de métricas clave:
  - Cantidad de items por categoría (Hardware, Software, Mobiliario, Insumo).
  - Valor monetario total del inventario.
- **Persistencia de Datos**: Integración con MockAPI para almacenar, recuperar y eliminar datos.
- **Diseño UI/UX Moderno**:
  - Estilo "Glassmorphism" (paneles translúcidos).
  - Diseño totalmente responsivo (adaptable a escritorio, tablet y móvil).
  - Feedback visual para el usuario (cargas, errores, confirmaciones).

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la aplicación.
- **CSS3**: Estilos avanzados utilizando Variables CSS, CSS Grid, Flexbox y efectos de fondo.
- **JavaScript (ES6+)**:
  - Manipulación del DOM.
  - Gestión de eventos.
  - Consumo de API con `fetch` y `async/await`.
  - Lógica de negocio para cálculos y validaciones.

## 📦 Instalación y Uso

1. **Clonar el repositorio** (o descargar los archivos):
   ```bash
   git clone https://github.com/JulianGon87/DashboardGestionRecursos
   ```

2. **Abrir la aplicación**:
   Simplemente abre el archivo `index.html` en tu navegador web preferido.

   > Nota: Para el correcto funcionamiento de las peticiones a la API, asegúrate de tener conexión a internet.

## 📋 Estructura del Proyecto

```
/
├── assets/
│   ├── css/
│   │   └── style.css      # Estilos principales y sistema de diseño
│   └── js/
│       └── app.js         # Lógica de la aplicación y conexión API
├── index.html             # Estructura principal
└── README.md              # Documentación
```

## 🔍 Funcionalidades Clave (Código)

- **API Integration**: Uso de `fetch` para operaciones CRUD (Create, Read, Delete).
- **Validación de Formularios**: Comprobaciones en tiempo real antes de enviar datos.
- **Formateo de Moneda**: Uso de `Intl.NumberFormat` para visualizar precios en Peso Chileno (CLP).
- **Manejo de Errores**: Feedback visual en inputs y alertas para fallos de red.

---
Desarrollado para el ejercicio práctico final del Módulo 4 - SENCE Frontend.
