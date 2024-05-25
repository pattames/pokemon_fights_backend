const express = require("express");

const { getAllPokemons, getOnePokemon } = require("../controllers/pokemon");

const api = express.Router();

api.route("/").get(getAllPokemons);

api.route("/:id").get(getOnePokemon);

module.exports = api;
