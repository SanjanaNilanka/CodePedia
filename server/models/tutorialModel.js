const mongoose = require('mongoose')

const tutorials_schema = new mongoose.Schema({

    tutorial_title: {
        type: String,
        required: true
    },
    tutorial_category: {
        type: String,
        required: true
    },
    tutorial_about: {
        type: String,
        required: true
    },
    tutorial_priority: {
        type: Number,
        required: false
    },
    tutorial_sections_count: {
        type: Number,
        required: true
    },
    tutorial_section: [{ title: String, paragraphs: [{ text: String, example: [String] }, ] }, ],

    tutorial_created_date: {
        type: Date,
        default: Date.now
    },
    tutorial_estimated_time: {
        type: String,
        required: false
    },
    tutorial_exercises: [{ question: String, answering_section: String, answer: String }],
    tutorial_reviews: [{ comment: String, rating: Number, user_id: String, postedDate: Date }],
})

module.exports = mongoose.model('tutorials', tutorials_schema)