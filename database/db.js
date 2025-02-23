const mongoose = require("mongoose")
require('dotenv').config()

const url = process.env.MONGODB_URI
const connectDB = async ()=>{
    try {
        await mongoose.connect(url, {

        })
        console.log("MongoDB Connected" );
    } catch (error) {
        console.error('Error connecting to MongoDB : ',error)
        process.exit(1)
    }
}


module.exports = connectDB