const express = require("express");
const cors = require("cors");
const app = express();
require("colors");
require("dotenv").config();
const connectDB = require("./dbinit");
const pokemon = require("./routes/pokemonRoute");
const user = require("./routes/userRoute");

connectDB();

const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/pokemon", pokemon);
app.use("/users", user);

app.get("/", (req, res) => {
  res.send("Welcome to our API");
});

app.listen(PORT, () => {
  console.log(`listening server running on http://localhost:${PORT}`);
});
