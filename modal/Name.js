var mongoose = require('mongoose')

const nameSchema = new mongoose.Schema({
    name: { type: String, require: true },
   
})
module.exports = mongoose.model('Name', nameSchema)