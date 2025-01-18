
function getPokemonNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('pokemon');
}


async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


async function displayPokemonDetails() {
    const pokemonName = getPokemonNameFromURL();
    if (!pokemonName) {
        document.getElementById('pokemon-name').textContent = 'No Pokémon selected!';
        return;
    }

    const data = await fetchPokemonData(pokemonName);
    if (data) {
        document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
        document.getElementById('pokemon-image').src = data.sprites.front_default;
        document.getElementById('pokemon-image').alt = data.name;

   
        document.getElementById('pokemon-abilities').innerHTML = data.abilities
            .map(ability => `<li>${ability.ability.name}</li>`)
            .join('');

     
        document.getElementById('pokemon-experience').textContent = data.base_experience;
    } else {
        document.getElementById('pokemon-name').textContent = 'Pokémon not found!';
        document.getElementById('pokemon-image').style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', displayPokemonDetails);
