require('dotenv').config();
const Wolf = require('./modules/Wolf.js');
const tradingPair = process.env.TRADING_PAIR;

const config = {
    tradingPair,
    baseAsset: tradingPair.substr(tradingPair.length - 3),
    profitPercentage: Number(process.env.PROFIT_PERCENTAGE)/100,
    budget: Number(process.env.BUDGET),
    compound: process.env.COMPOUND.toLowerCase() === "true",
    profitLockPercentage: Number(process.env.PROFIT_LOCK_PERCENTAGE),
    stopLimitPercentage: Number(process.env.STOP_LIMIT_PERCENTAGE)
};
const wolf = new Wolf(config);

//this may not be needed anymore: https://stackoverflow.com/a/48337609/5725837
if (process.platform === 'win32') {
  require('readline')
    .createInterface({
      input: process.stdin,
      output: process.stdout
    })
    .on('SIGINT', function() {
      process.emit('SIGINT');
    });
}

process.on('SIGINT', async function() {
    await wolf.kill();
    process.exit(0);
});
