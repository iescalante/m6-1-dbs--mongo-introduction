const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("exercise_1");
  console.log("connected!");

  const data = await db.collection("users").find().toArray();
  console.log(data);

  data.length
    ? res.status(200).json({ status: 200, data })
    : res.status(404).json({ status: 404, message: "It's empty!" });

  client.close();
  console.log("disconnected!");
};

module.exports = { getUsers };
