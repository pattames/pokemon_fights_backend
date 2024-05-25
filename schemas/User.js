const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  pokemons: [
    {
      type: String,
    },
  ],
});

//Signup function
userSchema.statics.signup = async function (username, password) {
  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("Username already in use");
  }

  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  // if (!validator.isStrongPassword(password)) {
  //   throw Error(
  //     "Make sure to use at least 8 characters, one upper case, one lower case, a number and a symbol"
  //   );
  // }

  const hasLettersAndNumbers = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(password);
  if (!hasLettersAndNumbers) {
    throw Error("Password must contain both letters and numbers.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const defaultPokemons = ["1", "4", "7"];

  const user = await this.create({ username, password: hash, pokemons: defaultPokemons });

  return user;
};

//Login function
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("Username is incorrect or it doesn't exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
