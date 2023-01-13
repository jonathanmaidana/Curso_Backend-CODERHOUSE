const yargs = require('yargs/yargs')(process.argv.slice(2))

const config = yargs
  .default({
    PORT: process.env.PORT
  })
 .argv

module.exports  = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: config.PORT
}