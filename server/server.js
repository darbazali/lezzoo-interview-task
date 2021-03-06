'use strict'

import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

import storeRoutes from './routes/storeRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import uploadRoute from './routes/uploadRoute.js'
import authUser from './utils/authUser.js'
import protect from './utils/authMiddleware.js'
const app = express()

dotenv.config()

/*=================================================
ENV VARIABLES
=================================================*/
const port = process.env.PORT || 5000
const env = process.env.NODE_ENV || 'development'
const __dirname = path.resolve()

/*=================================================
APP SETTINGS
=================================================*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (env === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
} else {
  app.get('/', protect, (req, res) => {
    res.send('API IS WORKING')
  })
}

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

/*=================================================
USING ROUTES MIDDLEWARES
=================================================*/

app.post('/api/user/login', authUser)
app.use('/api/stores', storeRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/item', itemRoutes)
app.use('/api/upload', uploadRoute)

/*=================================================
LISTEN FOR REQUESTS ON THE AVAILABLE PORT NUMBER
=================================================*/
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
