const JobListing = require('../models/jobListing');

const getEveryJobs = async (req, res) => {
    try {
        const jobListings = await JobListing.find({});
        res.json({ message: "Successfully fetched", data: jobListings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getEveryJobs }