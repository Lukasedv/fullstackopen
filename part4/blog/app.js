const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {
  logger.info('Connected to DB')
})
.catch((error) => {
  logger.error('error connecting', error.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)




app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app