const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const authRouter = require('./authRoutes')
const path = require('path');
const PORT = process.env.PORT || 3001
const MONGODB_URI = `mongodb+srv://user:user123@atlascluster.6aobwop.mongodb.net/GimnaziulCasunca?retryWrites=true&w=majority`
const app = express()

app.get('/', (request, response) => {
    response.send('<h2>Backend Work<h2>')
})

app.get('/hello', (request, response) => {
  response.send('<h2>Hello from backend!<h2>')
})

app.use(express.json())

app.use(cors());

app.use('/', authRouter)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://band-fuyo.onrender.com/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const start = async () => {
  try{
    await mongoose.connect(MONGODB_URI)
    app.listen(PORT, ()=>console.log(`server work on port ${PORT}`))
  }catch(e){
    console.log(e)
  }
}


start()

module.exports = app