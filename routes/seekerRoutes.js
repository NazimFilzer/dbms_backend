const express = require('express');
const auth = require('../middlewares/auth');
const { getEveryJobs } = require('../controllers/seekerController');

const router = express.Router()



// BASE URL - /api/seeker/

router.get('/all-jobs', auth, getEveryJobs)




module.exports = router
