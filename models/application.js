const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Replace 'User' with the actual name of your User schema
        required: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobListing',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    location: { 
        type: String,
        required: true,
    },
    qualifications: {
        type: String,
        required: true,
    },
    skills: [String],
    experience: {
        type: String,
        required: true,
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
