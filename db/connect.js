const mongoose = require('mongoose');
require('dotenv').config();

const db1 = mongoose.createConnection(process.env.MONGODB2_URI);

module.exports = db1;