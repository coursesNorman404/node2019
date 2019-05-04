'use strict'
const debug = require('debug')('todolist-db:index')

const setupDatabases = require('./lib/db')

const setupUser = require('./lib/user')
const setupList = require('./lib/list')

const setupUserModel = require('./schema/user')
const setupListModel = require('./schema/list')
const setupItemModel = require('./schema/item')

module.exports = async function (config) {
  debug('Si entro')
  const mongoose = await setupDatabases(config)
  const UserModel = await setupUserModel(config)
  const ListModel = await setupListModel(config)
  const ItemModel = await setupItemModel(config)

  // const norman = new UserModel({ email: 'norman5@gmail.com', password: '123456' })
  // await norman.save().then(() => debug('Listo'))
  const User = setupUser(UserModel)
  const List = setupList(UserModel, ListModel)
  const Item = null
  return {
    User,
    List,
    Item
  }
}
