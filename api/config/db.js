const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const conn = async () => {
  try {
    return await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.pldbomx.mongodb.net/?retryWrites=true&w=majority`
    )
  } catch (error) {
    console.error(error);
  }
}

conn();

module.exports = conn;