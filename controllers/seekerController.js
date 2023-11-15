const JobListing = require('../models/jobListing');
const Application = require('../models/application');

const getEveryJobs = async (req, res) => {
    try {
        const jobListings = await JobListing.find({});
        res.json({ message: "Successfully fetched", data: jobListings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

const applyForJob = async (req, res) => {
    try {
        const { name, email, phone, location, qualifications, skills, experience } = req.body;
        const jobId = req.params.id;
        const user = req.user.id // Assuming jobId is passed in the route parameters

        // Check if the job exists
        const job = await JobListing.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Create a new application
        const application = new Application({
            user,
            job: jobId,
            name,
            email,
            phone,
            location,
            qualifications,
            skills,
            experience,
        });

        // Save the application
        await application.save();

        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ error: error.message });
    }
};


const getAppliedJobs = async (req, res) => {
    try {
        const application = await Application.find({ user: req.user.id })
        res.json({ message: "Successfully fetched", data: application });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
module.exports = { getEveryJobs, applyForJob, getAppliedJobs }