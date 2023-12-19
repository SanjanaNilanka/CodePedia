require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const tutorialRoutes = require('./routes/tutorialRoutes')
const challengesRoutes = require('./routes/challengesRoutes')
const userRoutes = require('./routes/userRoutes');

app.use('/adminApp', tutorialRoutes)
app.use('/adminApp/challengesRoutes', challengesRoutes)
app.use("/admin/users", userRoutes);
app.use('/admin/tutorials', tutorialRoutes)


//compiler
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const compilerRoutes = require('./routes/compilerRoutes')
app.use('/compiler', compilerRoutes)







const PORT = 5000
const DB_URL = 'mongodb+srv://CodePedia:Y3S1@cluster0.y81ww5h.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB_URL).then(() => {
    console.log('Database was connected')
}).catch((err) => {
    console.log('Database was not connected, Error orccured')
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`)
})