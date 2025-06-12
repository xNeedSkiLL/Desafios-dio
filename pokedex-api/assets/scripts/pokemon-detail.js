const pokemonDetailContainer = document.getElementById('pokemonDetail');

function getPokemonIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id')
}

function showPokemonDetails(pokemon) {
    const typeColor = {
        fire: '#EE8130',
        grass: '#7AC74C',
        water: '#6390F0',
        electric: '#F7D02C',
        normal: '#A8A77A',
        bug: '#A6B91A',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        rock: '#B6A136',
        ice: '#96D9D6',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
    };

    const mainType = pokemon.type.toLowerCase();
    const backgroundColor = typeColor[mainType] || '#AAA';

    pokemonDetailContainer.innerHTML = `
        <div class="top-section" style="background-color: ${backgroundColor}">
            <h1 class="pokemon-name">${pokemon.name}</h1>
            <span class="pokemon-number">#${pokemon.number}</span>
            <img src="${pokemon.photo}" alt="${pokemon.name}" class="pokemon-image">
        </div>

        <div class="bottom-section pokemon-info">
            <h1>Sobre</h1>
            <p><strong>Tipo:</strong> ${pokemon.types.join(", ")}</p>
            <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
            <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
        </div>
    `;
}

function loadPokemonDetail() {
    const id = getPokemonIdFromURL();
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
            const pokemon = convertPokeApiDetailToPokemon(data);
            pokemon.weight = data.weight;
            pokemon.height = data.height;
            showPokemonDetails(pokemon);
        });
}

loadPokemonDetail();