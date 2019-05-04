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
      return existList
    }
  }
  function findAllUser (userId) {
    return ListModel.findAll({ userId })
  }
  return {
    crearOEditar,
    findAllUser
  }
}
