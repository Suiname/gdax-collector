const {get} = require('lodash');
require('dotenv').config();

const config = {
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  }
}

module.exports = {
  get: function(path) {
    return get(config, path, {});
  }
}
