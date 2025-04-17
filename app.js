const pokedexContainer = document.querySelector('.pokedex');

async function fetchPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await res.json();
}

function renderPokemonCard(pokemon) {
  const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
  const moves = pokemon.moves.slice(0, 5).map(m => m.move.name).join(', ');
  const types = pokemon.types.map(t => t.type.name);

  const card = document.createElement('div');
  card.classList.add('pokemon-card', types[0]);

  card.innerHTML = `
    <div class="ribbon">${pokemon.name}</div>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <div class="details">
      <p class="id">#${String(pokemon.id).padStart(3, '0')}</p>
      <div class="types">
        ${types.map(type => `<span class="type-badge ${type}">${type}</span>`).join('')}
      </div>
      <p><strong>Height:</strong> ${pokemon.height}</p>
      <p><strong>Abilities:</strong> ${abilities}</p>
      <p><strong>Moves:</strong> ${moves}</p>
    </div>
  `;

  pokedexContainer.appendChild(card);
}

async function loadPokedex() {
  for (let i = 1; i <= 10; i++) {
    const p = await fetchPokemon(i);
    renderPokemonCard(p);
  }
}

loadPokedex();
