'use strict'

const setupDatabases = require('./../lib/db')

module.exports = async function setupUser (config) {
  const mongoose = await setupDatabases(config)
  return mongoose.model('Item', {
    name: String,
    status: Number
  })
}
