const db = require('./src/db');
const Chart = require('gdax-candles');
const {tick} = require('./src/models/tick');

btcChart = new Chart({product: 'BTC-USD', timeframe: '5s'}).start();
ethChart = new Chart({product: 'ETH-USD', timeframe: '5s'}).start();
bchChart = new Chart({product: 'BCH-USD', timeframe: '5s'}).start();
ltcChart = new Chart({product: 'LTC-USD', timeframe: '5s'}).start();

const BTCTick = db.models.get('btc_usd');
const ETHTick = db.models.get('eth_usd');
const LTCTick = db.models.get('ltc_usd');
const BCHTick = db.models.get('bch_usd');

btcChart.on('close', candle => {
  BTCTick.create(tick(candle));
});

ethChart.on('close', candle => {
  ETHTick.create(tick(candle));
});

ltcChart.on('close', candle => {
  LTCTick.create(tick(candle));
});

bchChart.on('close', candle => {
  BCHTick.create(tick(candle));
});

btcChart.on('error', err => console.log(err));
ethChart.on('error', err => console.log(err));
bchChart.on('error', err => console.log(err));
ltcChart.on('error', err => console.log(err));
