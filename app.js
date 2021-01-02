const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const gerarPokemonPromises = () => Array(150).fill().map((_, index) => 
fetch(getPokemonUrl(index + 1)).then(response => response.json()))

//Lista de pokemons (li)
const gerarHTML = pokemons => pokemons.reduce(( acumulacao, { name, id, types }) => {
  const elementTypes = types.map(typeInfo => typeInfo.type.name)

      acumulacao += `
      <li class="card ${elementTypes[0]}">
      <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"" />
      <h2 class="card-title">${id}. ${name}</h2>
      <p class="card-subtitle">${elementTypes.join(' | ')}</p>
    </li>
  `
    return acumulacao
  }, '')

const inserirPokemonEmPaginas = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = gerarPokemonPromises()

Promise.all(pokemonPromises)
  .then(gerarHTML)
  .then(inserirPokemonEmPaginas)