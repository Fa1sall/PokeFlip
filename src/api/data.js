export async function getPokemonData(n) {
  try {
    const maxPokemons = 1024; //1025 pokemons
    const pokemonIds = new Set();

    while (pokemonIds.size < n) {
      pokemonIds.add(Math.floor(Math.random() * maxPokemons)) + 1;
    }

    const pokemonIdsArray = [...pokemonIds];

    const allData = pokemonIdsArray.map(
      (entry) => `https://pokeapi.co/api/v2/pokemon/${entry}/`,
    );

    const formattedData = allData.map(async (url) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch pokemon data.");
      }

      const data = await response.json();

      if (!data) {
        throw new Error("Error loading data.");
      }

      return {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
      };
    });

    return Promise.all(formattedData);
  } catch (e) {
    console.log("Error: " + e.message);
    throw e;
  }
}
