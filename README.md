# CENIDIAG-PROPOSE

Propuesta interactiva para CENIDIAG / Porkcolombia construida con React y Vite.

Nota: React/Vite se usa únicamente para esta landing/propuesta interactiva. El producto cotizado para Porkcolombia es una app móvil cross-platform en Ionic, según CP-0008.

## Fuente de verdad

La fuente contractual de alcance, fases, garantía y mantenimiento son los documentos PDF versionados en `docs/`:

- `docs/COTIZACION CP-0008 - PORKCOLOMBIA.pdf`
- `docs/ANEXO CP-0008-MANTENIMIENTO.pdf`

La app React/Vite es la fuente de verdad visual/renderizable de la landing:

- `main.jsx`: estructura general de la propuesta.
- `app.jsx`: prototipo móvil.
- `admin.jsx`: panel administrativo.
- `style.css`: estilos globales y efectos.

Si existe una diferencia entre la landing y los PDFs, se debe corregir la landing para alinearla con `docs/`.
No mantener copias HTML estáticas editables. Para publicar o exportar, generar siempre desde `npm run build`.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
