const mongoose = require("mongoose")

require('dotenv').config()

const mongoUrl = process.env.MONGODB

const initializeNewBookData = async () => {
    await mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log("Connected Successfully.")
    })
    .catch((error) => {
        throw error
    })
}

module.exports = { initializeNewBookData }