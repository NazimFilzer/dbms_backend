const JobListing = require('../models/jobListing');

const createJob = async (req, res) => {
    try {
        const { title, company, location, description, requirements, skills, type } = req.body;


        const postedBy = req.user.id;
        const newJobListing = new JobListing({
            title,
            company,
            location,
            description,
            requirements,
            skills,
            type,
            postedBy,
        });

        const savedJobListing = await newJobListing.save();
        res.status(201).json({ message: "Successfully Created", data: savedJobListing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



// Edit a job listing
const editJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, company, location, description, requirements, skills, type } = req.body;

        const updatedJobListing = await JobListing.findByIdAndUpdate(
            jobId,
            {
                $set: {
                    title,
                    company,
                    location,
                    description,
                    requirements,
                    skills,
                    type,
                },
            },
            { new: true }
        );

        if (!updatedJobListing) {
            return res.status(404).json({ error: 'Job Listing not found' });
        }

        res.json({ message: "Successfully edited", data: updatedJobListing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Delete a job listing
const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const deletedJobListing = await JobListing.findByIdAndDelete(jobId);

        if (!deletedJobListing) {
            return res.status(404).json({ error: 'Job Listing not found' });
        }

        res.json({ message: "Successfully deleted", data: deletedJobListing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createJob, editJob, deleteJob };
