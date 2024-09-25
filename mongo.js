const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://kottevishnuvardhann:lgggFRUHnZxINIcc@2048-game.ufyfc.mongodb.net/?retryWrites=true&w=majority&appName=2048-game",
    {
      dbName: "backend",
    }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const collection = mongoose.model("collections", newSchema);

module.exports = collection;
