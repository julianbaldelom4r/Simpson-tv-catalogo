# SimpsonsTV — TP2 de Programación III



Proyecto para el **Trabajo Práctico N.º 2**: dos páginas con

HTML, CSS y JavaScript vanilla, compiladas con **Vite**, que consumen una API

pública.



Tema elegido: **catálogo de series de televisión** (con estética inspirada en Los Simpsons).

API: <https://api.tvmaze.com/shows> (pública, sin clave y con CORS).



## Qué muestra



- **Landing** (`index.html`) con `header`, `nav`, hero, descripción y `footer`.

- **Catálogo** (`catalogo.html`) con tarjetas generadas desde JavaScript.

- **Búsqueda** por nombre y **filtro** por género.

- Estados de **cargando**, **error** y **sin resultados**.

- Estilos con variables de color, Flexbox, Grid, `:hover` y media query.



## Requisitos



- Node.js 18 o superior (`node --version`).



## Cómo ejecutarlo



```bash

npm install

npm run dev

```



## Cómo probar el build



```bash

npm run build     # genera dist/

npm run preview   # sirve dist/ para probarlo

```



Lo que se publica es el contenido de `dist/`. Si el catálogo anda en `dev`

pero no en `preview`, revisá el `vite.config.js`.



## Estructura



```

SimpsonTV/

├── index.html          Landing

├── catalogo.html       Catálogo

├── vite.config.js      Entradas del build y base relativa

├── src/

│   ├── main.js         Lógica de la landing

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



- El endpoint devuelve 240 series; el filtro de géneros se arma de forma dinamica

- Cada serie devuelve `image` como un objeto con dos tamaños (`medium` y `original`), por lo que se extrae `serie.image.medium` para las tarjetas, validando antes que no sea `null` para evitar errores.
 
-sin opciones escritas a mano.

