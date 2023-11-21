const JobListing = require('../models/jobListing');
const Application = require('../models/application');
const User = require('../models/user');
const Company = require('../models/company');

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await User.findOne({ email: email })
        console.log(admin)

        if (!admin) {
            return res.status(401).json({
                error: 'Invalid email/password',
            })
        }

        if (await bcrypt.compare(password, admin.password)) {
            const token = createToken(admin.id)

            return res.status(200).json({
                message: 'Successfully Logged in',
                token: token,
                user: admin,
            })
        }
        return res.status(401).json({
            error: 'Invalid email/password',
        })
    } catch (error) {
        console.log(error)
    }
}

const signup = async (req, res) => {
    const { email, password, username, type } = req.body
    if (!email) {
        return res.status(400).json({ error: 'Invalid email' })
    }

    if (!password) {
        return res.status(400).json({ error: 'Invalid password' })
    }

    if (password.length < 5) {
        return res.status(400).json({
            error: 'Password must be atleast 6 characters',
        })
    }

    const encryptPassword = await bcrypt.hash(password, 10)
    console.log(encryptPassword)
    try {
        const user = await User.create({
            email,
            password: encryptPassword,
            type,
            username
        })

        const token = createToken(user._id)
        res.status(201).json({
            message: 'Account Created',
            user: user,
            token: token,
        })
    } catch (err) {
        return res
            .status(500)
            .json({ error: 'Something went wrong', message: err.message })
    }
}

const getEveryJobs = async (req, res) => {
    try {
        const jobListings = await JobListing.find({});
        res.json({ message: "Successfully fetched", data: jobListings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

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

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        const company= await Company.find({});
        users.push(...company)
        res.json({ message: "Successfully fetched", data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getEveryJobs,deleteJob ,getAllUsers, login, signup}