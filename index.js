const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRoutes')
const path = require('path');
const PORT = process.env.PORT || 3001
const MONGODB_URI = `mongodb+srv://user:user123@atlascluster.6aobwop.mongodb.net/GimnaziulCasunca?retryWrites=true&w=majority`
const app = express()


app.get('/', (request, response) => {
    response.send('<h2>Backend Work<h2>')
})


app.use(express.json())

app.use('/', authRouter)

app.use(express.static(path.join(__dirname, 'GimnaziulCasunca\FrontGimnaziulCasunca\build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'GimnaziulCasunca\FrontGimnaziulCasunca\build', 'index.html'));
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