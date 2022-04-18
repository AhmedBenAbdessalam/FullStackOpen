const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.username || !body.password) {
    return response.status(400).json({ error: 'username and password are required' })
  }
  else if (body.username.length < 3 || body.password.length < 3) {
    return response.status(400).json({ error: 'username and password must be at least 3 characters long' })
  }
  //check if username is already taken
  const existingUser = await User.find({ username: body.username })
  if (existingUser.length > 0) {
    return response.status(400).json({ error: 'username is already taken' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
