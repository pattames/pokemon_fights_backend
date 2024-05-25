const User = require("../schemas/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Create token
const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "1h" });
};

//login user
const loginUser = async (req, res) => {
  const { username, password, pokemons } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);

    res
      .status(200)
      .json({ _id: user._id, username, token, pokemons: user.pokemons });
    console.log(`${username} logged in successfully!`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { username, password, pokemons } = req.body;

  try {
    const user = await User.signup(username, password);
    const token = createToken(user._id);

    res
      .status(200)
      .json({ _id: user._id, username, token, pokemons: user.pokemons });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create a user
const createUser = async (req, res) => {
  try {
    const { username, password, pokemons } = req.body;
    const user = await User.create({ username, password, pokemons });
    res.status(201).json({
      message: "User created successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

//Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length) {
      return res.status(200).json({ data: users });
    }
    res.status(404).json({ message: "Users not found" });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// get a single user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json({ data: user });
    }
    res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, pokemons } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        username,
        pokemons,
      },
      {
        new: true,
      }
    );

    if (!user) {
      res.status(404).json({ message: "I don't know this user" });
    } else {
      res
        .status(200)
        .json({ message: "User updates successfully", data: user });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  loginUser,
  signupUser,
};
