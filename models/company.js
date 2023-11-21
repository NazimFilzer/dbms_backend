const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    type: String,


})

const Company = mongoose.model('company', CompanySchema)
module.exports = Company

