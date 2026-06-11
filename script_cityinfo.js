const THEME_KIND ="openmeteo-current";
const API_URL = "";

const container = document.querySelector("#data-container");
const statusMessage = document.querySelector("#status-message");

function setStatus(message, type = "info") {
  if (!statusMessage) return;
  statusMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
}

function clearStatus() {
  if (statusMessage) statusMessage.innerHTML = "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createCard(item) {
  const image = item.image ? `<img src="${escapeHtml(item.image)}" class="card-img-top" alt="${escapeHtml(item.title)}">` : "";
  const meta = item.meta ? `<span class="badge text-bg-primary">${escapeHtml(item.meta)}</span>` : "";
  return `
    <div class="col-md-4">
      <article class="card h-100 shadow-sm">
        ${image}
        <div class="card-body">
          <h3 class="card-title h5">${escapeHtml(item.title)}</h3>
          <p class="card-text">${escapeHtml(item.body)}</p>
          ${meta}
        </div>
      </article>
    </div>
  `;
}

function render(items) {
  if (!container) return;
  container.innerHTML = items.map(createCard).join("");
}

async function loadFallback() {
  const response = await fetch("data.json");
  if (!response.ok) throw new Error("Impossibile caricare data.json");
  const data = await response.json();
  return data.items || [];
}

async function loadRemote() {
  if (THEME_KIND === "openmeteo-current") return await loadOpenMeteoCurrent();
  if (THEME_KIND === "openmeteo-daily") return await loadOpenMeteoDaily();
  if (THEME_KIND === "restcountries-atlas") return await loadRestCountriesAtlas();
  if (THEME_KIND === "restcountries-compare") return await loadRestCountriesCompare();
  if (THEME_KIND === "pokedex") return await loadPokedex();
  if (THEME_KIND === "pokemon-type") return await loadPokemonType();
  if (THEME_KIND === "jsonplaceholder-posts") return await loadJsonPlaceholderPosts();
  if (THEME_KIND === "jsonplaceholder-comments") return await loadSimpleList("comments");
  if (THEME_KIND === "dummyjson-products") return await loadDummyProducts();
  if (THEME_KIND === "themealdb") return await loadMeals();
  if (THEME_KIND === "openlibrary") return await loadOpenLibrary();
  if (THEME_KIND === "jikan") return await loadJikan();
  if (THEME_KIND === "dogapi") return await loadDogApi();
  if (THEME_KIND === "rickmorty") return await loadRickMorty();
  if (THEME_KIND === "nager") return await loadNager();
  if (THEME_KIND === "usgs") return await loadUSGS();
  if (THEME_KIND === "datamuse") return await loadDatamuse();
  if (THEME_KIND === "itunes") return await loadITunes();
  if (THEME_KIND === "randomuser") return await loadRandomUser();
  if (THEME_KIND === "spaceflight") return await loadSpaceflight();
  throw new Error("Tema non riconosciuto");
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Errore richiesta: ${url}`);
  return await response.json();
}

async function loadOpenMeteoCurrent() {
  const cities = [
    { name: "Madrid", latitude: 40.3000, longitude: 30.4024, info: "Capitale della Spagna" },
    { name: "Dublino", latitude: 53.210, longitude: 61.537,info: "Capitale dell'Irlanda" },
    { name: "Lisbona", latitude: 38.4225, longitude: 9.0807, info: "Capitale del Portogallo" },
    { name: "Parigi", latitude: 48.8566, longitude: 2.3522, info: "Capitale della Francia" }
  ];
  const items = [];
  for (const city of cities) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`;
    const data = await fetchJson(url);
    items.push({
      title: city.name,
      body: `${city.info}`,
      meta: data.current.time
    });
  }
  return items;
}

async function loadOpenMeteoDaily() {
  const destinations = [
    { name: "Parigi", latitude: 48.8566, longitude: 2.3522, advice: "Weekend culturale." },
    { name: "Tokyo", latitude: 35.6762, longitude: 139.6503, advice: "Viaggio lungo." },
    { name: "Londra", latitude: 51.5072, longitude: -0.1276, advice: "Porta un piano B al chiuso." }
  ];
  const items = [];
  for (const place of destinations) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const data = await fetchJson(url);
    items.push({
      title: place.name,
      body: `${place.advice} Oggi: min ${data.daily.temperature_2m_min[0]}°C, max ${data.daily.temperature_2m_max[0]}°C, pioggia ${data.daily.precipitation_probability_max[0]}%.`,
      meta: data.daily.time[0]
    });
  }
  return items;
}

async function loadRestCountriesAtlas() {
  const data = await fetchJson(API_URL);
  return data.filter(c => c.capital && c.flags).slice(0, 12).map(c => ({
    title: c.name.common,
    body: `Capitale: ${c.capital?.[0] ?? "n.d."}. Regione: ${c.region}. Popolazione: ${c.population?.toLocaleString("it-IT") ?? "n.d."}.`,
    meta: c.region,
    image: c.flags.png
  }));
}

async function loadRestCountriesCompare() {
  const data = await fetchJson(API_URL);
  return data.slice(0, 12).map(c => ({
    title: c.name.common,
    body: `Capitale: ${c.capital?.[0] ?? "n.d."}. Popolazione: ${c.population?.toLocaleString("it-IT") ?? "n.d."}. Area: ${c.area?.toLocaleString("it-IT") ?? "n.d."} km².`,
    meta: c.subregion || c.region,
    image: c.flags?.png
  }));
}

async function loadPokedex() {
  const list = await fetchJson(API_URL);
  const details = await Promise.all(list.results.map(p => fetchJson(p.url)));
  return details.map(p => ({
    title: p.name,
    body: `Altezza: ${p.height}. Peso: ${p.weight}. Tipi: ${p.types.map(t => t.type.name).join(", ")}.`,
    meta: `#${p.id}`,
    image: p.sprites.front_default
  }));
}

async function loadPokemonType() {
  const typeData = await fetchJson(API_URL);
  const selected = typeData.pokemon.slice(0, 9);
  const details = await Promise.all(selected.map(entry => fetchJson(entry.pokemon.url)));
  return details.map(p => ({
    title: p.name,
    body: `Pokémon del tipo scelto. Altezza: ${p.height}. Peso: ${p.weight}.`,
    meta: `#${p.id}`,
    image: p.sprites.front_default
  }));
}

async function loadJsonPlaceholderPosts() {
  const [posts, users] = await Promise.all([
    fetchJson("https://jsonplaceholder.typicode.com/posts"),
    fetchJson("https://jsonplaceholder.typicode.com/users")
  ]);
  return posts.slice(0, 12).map(post => {
    const user = users.find(u => u.id === post.userId);
    return { title: post.title, body: post.body, meta: user ? user.name : `utente ${post.userId}` };
  });
}

async function loadSimpleList(kind) {
  const data = await fetchJson(API_URL);
  if (kind === "comments") {
    return data.slice(0, 12).map(c => ({ title: c.name, body: c.body, meta: c.email }));
  }
  return [];
}

async function loadDummyProducts() {
  const data = await fetchJson(API_URL);
  return data.products.map(p => ({
    title: p.title,
    body: `${p.description} Prezzo: ${p.price} €. Valutazione: ${p.rating}.`,
    meta: p.category,
    image: p.thumbnail
  }));
}

async function loadMeals() {
  const data = await fetchJson(API_URL);
  const meals = data.meals || [];
  return meals.slice(0, 12).map(m => ({
    title: m.strMeal,
    body: `Categoria: ${m.strCategory}. Area: ${m.strArea}. Ingredienti principali: ${m.strIngredient1}, ${m.strIngredient2}, ${m.strIngredient3}.`,
    meta: m.strArea,
    image: m.strMealThumb
  }));
}

async function loadOpenLibrary() {
  const data = await fetchJson(API_URL);
  return data.docs.slice(0, 12).map(b => ({
    title: b.title,
    body: `Autore: ${(b.author_name || ["n.d."]).join(", ")}. Prima pubblicazione: ${b.first_publish_year || "n.d."}.`,
    meta: `${b.edition_count || 0} edizioni`
  }));
}

async function loadJikan() {
  const data = await fetchJson(API_URL);
  return data.data.map(a => ({
    title: a.title,
    body: `${a.synopsis ? a.synopsis.slice(0, 160) + "..." : "Descrizione non disponibile."} Punteggio: ${a.score || "n.d."}.`,
    meta: a.type || "anime",
    image: a.images?.jpg?.image_url
  }));
}

async function loadDogApi() {
  const data = await fetchJson(API_URL);
  return data.message.map((url, index) => ({
    title: `Immagine cane ${index + 1}`,
    body: "Immagine caricata dalla Dog CEO API. Aggiungi una descrizione o una categoria nella pagina.",
    meta: "Dog API",
    image: url
  }));
}

async function loadRickMorty() {
  const data = await fetchJson(API_URL);
  return data.results.slice(0, 12).map(ch => ({
    title: ch.name,
    body: `Specie: ${ch.species}. Stato: ${ch.status}. Origine: ${ch.origin?.name || "n.d."}.`,
    meta: ch.gender,
    image: ch.image
  }));
}

async function loadNager() {
  const data = await fetchJson(API_URL);
  return data.slice(0, 12).map(h => ({
    title: h.localName,
    body: `Nome internazionale: ${h.name}. Data: ${h.date}. Paese: ${h.countryCode}.`,
    meta: h.global ? "nazionale" : "locale"
  }));
}

async function loadUSGS() {
  const data = await fetchJson(API_URL);
  return data.features.slice(0, 12).map(f => ({
    title: f.properties.place || "Luogo non disponibile",
    body: `Magnitudo: ${f.properties.mag ?? "n.d."}. Tipo: ${f.properties.type}.`,
    meta: new Date(f.properties.time).toLocaleString("it-IT")
  }));
}

async function loadDatamuse() {
  const data = await fetchJson(API_URL);
  return data.map(w => ({
    title: w.word,
    body: `Parola semanticamente collegata al termine cercato. Punteggio Datamuse: ${w.score}.`,
    meta: "related word"
  }));
}

async function loadITunes() {
  const data = await fetchJson(API_URL);
  return data.results.map(m => ({
    title: m.trackName || m.collectionName,
    body: `Artista: ${m.artistName}. Album: ${m.collectionName || "n.d."}. Genere: ${m.primaryGenreName || "n.d."}.`,
    meta: m.kind || "media",
    image: m.artworkUrl100
  }));
}

async function loadRandomUser() {
  const data = await fetchJson(API_URL);
  return data.results.map(u => ({
    title: `${u.name.first} ${u.name.last}`,
    body: `Email: ${u.email}. Città: ${u.location.city}. Paese: ${u.location.country}.`,
    meta: u.nat,
    image: u.picture.large
  }));
}

async function loadSpaceflight() {
  const data = await fetchJson(API_URL);
  const articles = data.results || [];
  return articles.map(a => ({
    title: a.title,
    body: a.summary ? `${a.summary.slice(0, 180)}...` : "Riassunto non disponibile.",
    meta: a.news_site || "news",
    image: a.image_url
  }));
}

async function init() {
  try {
    setStatus("Caricamento dati dalla API remota...", "info");
    const items = await loadRemote();
    render(items);
    clearStatus();
  } catch (error) {
    console.warn(error);
    setStatus("API non disponibile: uso i dati locali di fallback da data.json.", "warning");
    try {
      const items = await loadFallback();
      render(items);
    } catch (fallbackError) {
      console.error(fallbackError);
      setStatus("Errore: non riesco a caricare né la API remota né data.json.", "danger");
    }
  }
}

init();