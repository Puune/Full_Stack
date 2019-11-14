require('dotenv').config()

let PORT = process.env.PORT;
let MONODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONODB_URI,
  PORT
}