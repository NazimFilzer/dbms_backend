const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: String,
    description: {
        type: String,
        required: true,
    },
    requirements: String,
    skills: [String],
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // You may need to create a Recruiter schema
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    salary: Number,
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

module.exports = JobListing;
