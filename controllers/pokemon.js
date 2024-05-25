const jsonData = require("../pokefight.json");

//get all pokemons
const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await jsonData;
    res.status(200).json({ data: pokemons });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//get one pokemon
const getOnePokemon = (req, res) => {
  const pokemons = jsonData.find(
    (pokemon) => pokemon.id === Number(req.params.id)
  );
  res.json(pokemons);
};

module.exports = { getAllPokemons, getOnePokemon };
