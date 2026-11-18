const API_URL = "https://api.tvmaze.com/shows";

const estado = document.querySelector("#estado");
const grilla = document.querySelector("#grilla");
const buscador = document.querySelector("#buscador");
const filtrogenero = document.querySelector("#genero");

let series = [];
let texto = "";
let genero = "todas";

async function cargarSeries() {
  estado.textContent = "Cargando...";
  grilla.innerHTML = "";

  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} en la respuesta`);
    }

    const datos = await respuesta.json();
    series = datos;

    cargargeneros(datos);
    render();
  } catch (error) {
    estado.textContent = "No se pudieron cargar la grilla de series. Intenta de nuevo.";
    console.error(error);
  }
}

function cargargeneros(lista) {
  const todosLosGeneros = lista.reduce(
    (acc, { genres = [] }) => [...acc, ...genres], 
    []
  );  

  const generosUnicos = [...new Set(todosLosGeneros)].sort();


  for (const nombre of generosUnicos) {
    const opcion = document.createElement("option");
    opcion.value = nombre;
    opcion.textContent = nombre;
    filtrogenero.appendChild(opcion);
  }
}

function render() {
  const filtrados = series.filter((s) => {
    const coincideTexto = s.name.toLowerCase().includes(texto);
    const coincidegenero = genero === "todas" || (s.genres && s.genres.includes(genero));
    return coincideTexto && coincidegenero;
  });

  grilla.innerHTML = "";

  if (filtrados.length === 0) {
    estado.textContent = "Sin resultados.";
    return;
  }


  estado.textContent = `${filtrados.length} series(s)`;

  for (const serie of filtrados) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    const imagen = document.createElement("img");
    imagen.src = serie.image ? serie.image.medium : "";
    imagen.alt = `Poster de ${serie.name}`;
    imagen.loading = "lazy";

    const titulo = document.createElement("h2");
    titulo.textContent = serie.name;

    const detalle = document.createElement("p");
    detalle.textContent = `${generosStr(serie)} ·  ${serie.rating?.average || "N/A"}`;

    tarjeta.append(imagen, titulo, detalle);
    grilla.appendChild(tarjeta);
  }
}

function generosStr(serie) {
  return serie.genres && serie.genres.length > 0 ? serie.genres[0] : "Televisión";
}

buscador.addEventListener("input", (evento) => {
  texto = evento.target.value.trim().toLowerCase();
  render();
});

filtrogenero.addEventListener("change", (evento) => {
  genero = evento.target.value;
  render();
});

cargarSeries();
