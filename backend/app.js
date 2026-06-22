const dotenv = require('dotenv')
dotenv.config(); 
const cookieparser = require('cookie-parser')
const path = require('path')
const express = require('express');
const cors = require('cors')
const app = express()
const connectToDB = require('./db/db.js')
const userRoutes = require('./Routes/user.routes.js')
const captainRoutes = require('./Routes/captain.routes.js')
const mapsRoutes = require('./Routes/maps.routes.js')
const morgan = require('morgan');
app.use(morgan('dev'))

connectToDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

app.use('/users',userRoutes)
app.use('/captains',captainRoutes)
app.use('/maps',mapsRoutes)


app.get('/',(req,res)=>{
    res.send('hello world')
})

module.exports=app;