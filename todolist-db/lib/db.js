'use strict'

const Mongoose = require('mongoose')
let mongoose = null

module.exports = function setupDatabases (config) {
  if (!mongoose) {
    mongoose = Mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`, { useNewUrlParser: true })
  }
  return mongoose
}
