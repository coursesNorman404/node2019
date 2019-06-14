'use strict'

const debug = require('debug')('todolist-db:lib:list')

module.exports = function setupLista (UserModel, ListModel) {
  async function crearOEditar (list) {
    let existUser = await UserModel.findById(list.userId)
    debug(existUser)
    if (existUser) {
      let existList = await ListModel.findOne({ name: list.name, userId: list.userId })
      debug(existList)
      if (!existList) {
        let newList = new ListModel(list)
        debug(newList)
        await newList.save()
        return newList
      }
      existList.category = list.category
      await existList.save()
      return existList
    } else {
      let error = new Error('Not user')
      throw error
    }
  }
  function findAllUser (userId) {
    return ListModel.find({ userId })
  }
  function findById (listId) {
    return ListModel.findById(listId)
  }
  return {
    crearOEditar,
    findAllUser,
    findById
  }
}
