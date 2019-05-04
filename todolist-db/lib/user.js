'use strict'

module.exports = function setupUser (UserModel) {
  async function crearOEditar (user) {
    let existUser = await UserModel.findOne({ email: user.email })
    if (!existUser) {
      let newUser = new UserModel(user)
      await newUser.save()
      return newUser
    }
    existUser.password = user.password
    await existUser.save()
    return existUser
  }
  function findByEmail (email) {
    return UserModel.findOne({ email })
  }
  return {
    findByEmail,
    crearOEditar
  }
}
