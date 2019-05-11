'use strict'

const debug = require('debug')('todolist:api')
const express = require('express')
const db = require('todolist-db')

const api = express.Router()

const { asyncMiddleware } = require('./tools/asyncMiddleware')

let services, User, List, Item

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Conectando a la base de datos')
    try {
      services = await db({
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 27017,
        db: process.env.DB || 'test'
      })
    } catch (e) {
      next(e)
    }
    User = services.User
    List = services.List
    Item = services.Item
  }
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-type, Acceps, X-Custom-Header')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

api.get('/', async (req, res) => {
  debug('Si entro yo')
  let user = await User.findByEmail('norman11@gmail.com')
  res.json(user)
})

api.post('/login', async (req, res) => {
  debug('User Login post')
  const { email, password } = req.body
  let user
  user = await User.findByEmail(email)
  if (!user) {
    user = await User.crearOEditar({ email, password })
    res.json(user)
  } else {
    if (password === user.password) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'Not user' })
    }
  }
})
api.get('/user/:id/list', asyncMiddleware(async (req, res) => {
  debug('User Id list')
  const { id } = req.params
  let lists = await List.findAllUser(id)
  res.json(lists)
}))
api.post('/user/:id/list', asyncMiddleware(async (req, res, next) => {
  debug('Post user id list')
  const { id } = req.params
  const { name, category } = req.body
  let list = await List.crearOEditar({ name, category, userId: id })
  debug(list)
  res.json(list)
}))
module.exports = api
