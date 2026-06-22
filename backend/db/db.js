const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.DB_CONNECT)
    console.log("connect to DB 👍");
    
}

module.exports = connectToDB;  