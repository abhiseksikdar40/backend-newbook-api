
const mongoose = require('mongoose')

const newBooksSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    genre: [{
        type: String,
        enum: ["Fiction", "Non-fiction", "Mystery", "Thriller", "Science Fiction", "Fantasy", "Romance", "Historical", "Biography", "Self-help", "Other", "Business", "Autobiography"]
    }],
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "United States"
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    summary: String,
    coverImageUrl: String
},
    {
        timestamps: true
    }
)

const NEWBook = mongoose.model("NEWBook", newBooksSchema)

module.exports = NEWBook