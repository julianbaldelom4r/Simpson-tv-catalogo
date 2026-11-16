# Ejemplo base — TP2 de Programación III

Proyecto de referencia para el **Trabajo Práctico N.º 2**: dos páginas con
HTML, CSS y JavaScript vanilla, compiladas con **Vite**, que consumen una API
pública.

Tema elegido: **personajes de Rick and Morty**.
API: <https://rickandmortyapi.com/api/character> (pública, sin clave y con CORS).

## Qué muestra

- **Landing** (`index.html`) con `header`, `nav`, hero, descripción y `footer`.
- **Catálogo** (`catalogo.html`) con tarjetas generadas desde JavaScript.
- **Búsqueda** por nombre y **filtro** por especie.
- Estados de **cargando**, **error** y **sin resultados**.
- Estilos con variable de color, Flexbox, Grid, `:hover` y media query.

> En el enunciado del TP, la búsqueda y el filtro son **opcionales**. Acá están
> incluidos para que sirvan de referencia.

## Requisitos

- Node.js 18 o superior (`node --version`).

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abrí la URL que muestra la terminal (por defecto `http://localhost:5173`).

## Cómo probar el build

```bash
npm run build     # genera dist/
npm run preview   # sirve dist/ para probarlo
```

Lo que se publica es el contenido de `dist/`. Si el catálogo anda en `dev`
pero no en `preview`, revisá el `vite.config.js`.

## Estructura

```
ejemplo-tp2/
├── index.html          Landing
├── catalogo.html       Catálogo
├── vite.config.js      Entradas del build y base relativa
├── src/
│   ├── main.js         Año del footer
│   ├── catalogo.js     Fetch, búsqueda, filtro y tarjetas
│   └── styles.css      Estilos compartidos
└── README.md
```

## Por qué el `vite.config.js` declara las dos páginas

En desarrollo, Vite sirve cualquier `.html` que esté en la raíz. En el build,
en cambio, solo incluye `index.html` salvo que se declaren las demás como
entradas:

```js
build: {
  rollupOptions: {
    input: {
      main: fileURLToPath(new URL("./index.html", import.meta.url)),
      catalogo: fileURLToPath(new URL("./catalogo.html", import.meta.url)),
    },
  },
}
```

Sin eso, `catalogo.html` no llega a `dist/` y da **404** publicado.

`base: "./"` genera rutas relativas de assets, para que funcione tanto en la
raíz del dominio como en un subdirectorio (por ejemplo, GitHub Pages).

## Notas

- La API devuelve 20 personajes por página; el ejemplo usa la primera, así que
  el filtro se arma con esas especies.
- Los enlaces entre páginas son relativos (`./catalogo.html`) a propósito.
- Si una API requiere clave, no se sube al repositorio: se guarda en un archivo
  ignorado por git.
