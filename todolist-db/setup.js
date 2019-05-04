'use strict'

const debug = require('debug')('todolist-db:setup')
const db = require('./')

async function setup () {
  const config = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 27017,
    db: process.env.DB || 'test'
  }
  let a = await db(config)
  let t = await a.User.crearOEditar({
    email: 'norman11@gmail.com',
    password: '987654'
  })
  if (t.password === '987654') {
    let l = await a.List.crearOEditar({
      name: 'Escuela',
      category: 'School',
      userId: t._id
    })
    debug(l)
  }
  debug('Exito!!')
  process.exit(0)
}
setup().catch(err => {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
})
