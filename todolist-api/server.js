'use strict'

const debug = require('debug')('todolist:server')
const compression = require('compression')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const socketIO = require('socket.io')

const api = require('./api')

const port = process.env.PORT || 5230
const app = express()
const server = http.createServer(app)
const jsonBodyParser = bodyParser.json()
const io = socketIO(server)
const urlencodedBodyParser = bodyParser.urlencoded({ extended: true })

app.io = io
app.use(compression())
app.use(jsonBodyParser)
app.use(urlencodedBodyParser)
app.use('/api', api)

app.use((error, req, res, next) => {
  debug(error)
  res.status(500).json({ message: error.message })
})

io.on('connection', (socket) => {
  debug('Se conectaro')
  socket.broadcast.emit('hi')
})

if (!module.parent) {
  server.listen(port, () => {
    debug('El puerto magico es ', port)
  })
}

module.exports = server
