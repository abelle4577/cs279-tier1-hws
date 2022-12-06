// mongoose needed for database manipulation
const mongoose = require('mongoose');

// define the structure of how we will store tasks in the database
// Want the task itself to be saved as a string and 
// the time its added as the current date/time
const todoTaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);