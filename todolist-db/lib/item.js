'use strict'

const debug = require('debug')('todolist-db:lib:item')

module.exports = function setupItem (ListModel, ItemModel) {
  async function crearOEditar (item) {
    let existList = await ListModel.findById(item.listId)
    debug(existList)
    if (existList) {
      let existItem = await ItemModel.findOne({ name: item.name, listId: item.listId })
      debug(existItem)
      if (!existItem) {
        let newItem = new ItemModel(item)
        debug(newItem)
        await newItem.save()
        return newItem
      }
      existItem.status = item.status
      await existItem.save()
      return existItem
    }
  }
  function findAllList (listId) {
    return ItemModel.find({ listId })
  }
  return {
    crearOEditar,
    findAllList
  }
}
