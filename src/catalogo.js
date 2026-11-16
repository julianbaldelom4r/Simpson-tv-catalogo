const API_URL = "https://rickandmortyapi.com/api/character";

const estado = document.querySelector("#estado");
const grilla = document.querySelector("#grilla");
const buscador = document.querySelector("#buscador");
const filtroEspecie = document.querySelector("#especie");

let personajes = [];
let texto = "";
let especie = "todas";

async function cargarPersonajes() {
  estado.textContent = "Cargando...";
  grilla.innerHTML = "";

  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} en la respuesta`);
    }

    const datos = await respuesta.json();
    personajes = datos.results;

    cargarEspecies(personajes);
    render();
  } catch (error) {
    estado.textContent = "No se pudieron cargar los personajes. Probá de nuevo.";
    console.error(error);
  }
}

function cargarEspecies(lista) {
  const especies = [...new Set(lista.map((p) => p.species))].sort();

  for (const nombre of especies) {
    const opcion = document.createElement("option");
    opcion.value = nombre;
    opcion.textContent = nombre;
    filtroEspecie.appendChild(opcion);
  }
}

function render() {
  const filtrados = personajes.filter((p) => {
    const coincideTexto = p.name.toLowerCase().includes(texto);
    const coincideEspecie = especie === "todas" || p.species === especie;
    return coincideTexto && coincideEspecie;
  });

  grilla.innerHTML = "";

  if (filtrados.length === 0) {
    estado.textContent = "Sin resultados.";
    return;
  }

  estado.textContent = `${filtrados.length} personaje(s)`;

  for (const personaje of filtrados) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    const imagen = document.createElement("img");
    imagen.src = personaje.image;
    imagen.alt = `Retrato de ${personaje.name}`;
    imagen.loading = "lazy";

    const titulo = document.createElement("h2");
    titulo.textContent = personaje.name;

    const detalle = document.createElement("p");
    detalle.textContent = `${personaje.status} · ${personaje.species}`;

    tarjeta.append(imagen, titulo, detalle);
    grilla.appendChild(tarjeta);
  }
}

buscador.addEventListener("input", (evento) => {
  texto = evento.target.value.trim().toLowerCase();
  render();
});

filtroEspecie.addEventListener("change", (evento) => {
  especie = evento.target.value;
  render();
});

cargarPersonajes();
