const mongoose = require('mongoose');
require('dotenv').config();

const db = () => {
    let connect;
    try{
        connect = mongoose.connect(process.env.MONGODB2_URI);
        console.log('DB connection successful!!!')
    }catch(err){
        console.log('Problem with database connection. Check and try again!!!');
        console.log(err)
    }
}


module.exports = db;