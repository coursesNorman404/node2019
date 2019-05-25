const dbStub = null

const UserStub = {
  findByEmail: null,
  crearOEditar: null
}
const ListStub = {
  findAllUser: null
}
const user = {
  id: '123456',
  email: 'norman123@gmail.com',
  password: '123456'
}
const userNotPassword = {
  email: 'norman123@gmail.com',
  password: '12345'
}
const newUser = {
  email: 'norman404@gmail.com',
  password: '123456'
}
const lists = [
  { name: 'Escuela', category: 'work' },
  { name: 'Trabajo', category: 'work' }
]

module.exports = {
  dbStub,
  UserStub,
  user,
  userNotPassword,
  newUser,
  ListStub,
  lists
}
