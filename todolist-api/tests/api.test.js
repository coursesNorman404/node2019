'use strict'

const test = require('ava')
const request = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

let server = null
let sandbox = null
let {
  dbStub,
  UserStub,
  user,
  userNotPassword,
  newUser,
  ListStub,
  lists } = require('./fixtures/db')

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  dbStub = sandbox.stub()
  dbStub.returns(
    Promise.resolve({
      User: UserStub,
      List: ListStub
    })
  )
  UserStub.findByEmail = sandbox.stub()
  ListStub.findAllUser = sandbox.stub()

  UserStub.findByEmail
    .withArgs('norman404@gmail.com')
    .returns(Promise.resolve(null))

  UserStub.findByEmail.returns(Promise.resolve(user))

  UserStub.crearOEditar = sandbox.stub()
  UserStub.crearOEditar.returns(Promise.resolve(newUser))

  ListStub.findAllUser.returns(Promise.resolve(lists))

  const api = proxyquire('../api', {
    'todolist-db': dbStub
  })
  server = proxyquire('../server', {
    './api': api
  })
})
test.afterEach(() => {
  sandbox && sandbox.restore()
})
test.serial.cb('login', t => {
  request(server)
    .post('/api/login')
    .send(user)
    .expect(200)
    .end((err, res) => {
      t.falsy(err, 'error login')
      t.deepEqual(res.body.email, 'norman123@gmail.com', 'No es el correo')
      t.deepEqual(UserStub.crearOEditar.calledOnce, false, 'Fue creado el usuario')
      t.end()
    })
})
test.serial.cb('login Not User', t => {
  request(server)
    .post('/api/login')
    .send(userNotPassword)
    .expect(404)
    .end((err, res) => {
      t.falsy(err, 'error login')
      t.deepEqual(res.body.message, 'Not user', 'Existe el usuario')
      t.end()
    })
})

test.serial.cb('Crear Usario', t => {
  request(server)
    .post('/api/login')
    .send(newUser)
    .expect(200)
    .end((err, res) => {
      t.falsy(err, 'error login')
      t.deepEqual(UserStub.crearOEditar.calledOnce, true, 'No fue creado el usuario')
      t.deepEqual(res.body.email, newUser.email, 'No es el correo')
      t.end()
    })
})

test.serial.cb('User List', t => {
  request(server)
    .get(`/api/user/${user.id}/list`)
    .expect(200)
    .end((err, res) => {
      t.falsy(err, 'error user list')
      t.deepEqual(res.body[0], { name: 'Escuela', category: 'work' }, 'La lista es incorrecta')
      t.end()
    })
})
