# Todolist-db

## Usege

```js
const setupDatabase = requiere('todolist-db')

setupDatabases(config)
  .then(db => {
    const {User, Lists, Items} = db
    User.create({
      email: "norman.torres.mx@gmail.com",
      password: "123456"
    })
  })
  .catch(err => console.error(err))
```