const Sequelize =  require('sequelize');
const config = require('./config');
const {tick} = require('./schemas');

const sequelize = new Sequelize(config.get('db.name'), config.get('db.username'), config.get('db.password'), {
  host: config.get('db.host'),
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const models = {
  btc_usd: sequelize.define('btc_usd', tick),
  eth_usd: sequelize.define('eth_usd', tick),
  bch_usd: sequelize.define('bch_usd', tick),
  ltc_usd: sequelize.define('ltc_usd', tick)
}

Object.keys(models).forEach(model => models[model].sync({ force: false }).then(() => {
  console.log(`Relation: ${model} sync\'d to ${config.get('db.name')}`);
}));

module.exports = {
  instance: sequelize,
  models: {
    get: function(name) {
      return models[name];
    }
  }
};
