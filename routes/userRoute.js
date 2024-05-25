const express = require("express");

const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  loginUser,
  signupUser,
} = require("../controllers/user");

// const {
//   getAllPokemons,
//   getOnePokemon,
// } = require("../controllers/pokemon");

const api = express.Router();

api.route("/").post(createUser).get(getAllUsers);
// .get(getAllPokemons)
// .get(getOnePokemon);

api.route("/:id").get(getUser).put(updateUser);

api.route("/login").post(loginUser);

api.route("/signup").post(signupUser);

module.exports = api;
