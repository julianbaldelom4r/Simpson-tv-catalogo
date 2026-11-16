import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// Las dos páginas se declaran como entradas para que el build
// las copie a dist/. Sin esto, catalogo.html da 404 al publicar.
export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        catalogo: fileURLToPath(new URL("./catalogo.html", import.meta.url)),
      },
    },
  },
});
