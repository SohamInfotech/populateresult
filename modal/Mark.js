var mongoose = require('mongoose')
const Name =require('./Name')
const MarkSchema = new mongoose.Schema({
    guj: {
        type: Number,
        required: true
    },
    eng: {                        
        type: Number,
        required: true
    },
    sci: {
        type: Number,
        required: true
    },
    ss: {
        type: Number,
        required: true
    },
    maths: {
        type: Number,
        required: true
    },
    resultid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Name"
    }
})
module.exports = mongoose.model('Mark', MarkSchema)