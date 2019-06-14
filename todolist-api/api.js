'use strict'

const debug = require('debug')('todolist:api')
const express = require('express')
const db = require('todolist-db')
const jwt = require('jsonwebtoken')
const auth = require('express-jwt')

const api = express.Router()

const { asyncMiddleware } = require('./tools/asyncMiddleware')

let services, User, List, Item

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Conectando a la base de datos')
    try {
      services = await db({
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

api.get('/', auth({ secret: 'norman' }), async (req, res) => {
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
      let token = jwt.sign({ email: user.email }, 'norman')
      res.json({ token, user })
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
api.get('/user/:id/list/:idList', asyncMiddleware(async (req, res) => {
  debug('Get List')
  const { idList } = req.params
  let list = await List.findById(idList)
  res.json(list)
}))
api.get('/list/:id/item', asyncMiddleware(async (req, res) => {
  debug('Get list id items')
  const { id } = req.params
  let items = await Item.findAllList(id)
  res.json(items)
}))

api.post('/list/:id/item', asyncMiddleware(async (req, res) => {
  debug('Post list id item')
  const { id } = req.params
  const { name, status } = req.body
  let item = await Item.crearOEditar({ name, status, listId: id })
  res.json(item)
}))

api.patch('/list/:listId/item/:itemId', asyncMiddleware(async (req, res) => {
  debug('patch list item id')
  const { listId, itemId } = req.params
  const { status } = req.body
  let items = await Item.crearOEditar({ status, listId, _id: itemId })
  res.send(items)
}))
module.exports = api
