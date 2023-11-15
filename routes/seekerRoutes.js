const express = require('express');
const auth = require('../middlewares/auth');
const { getEveryJobs, applyForJob } = require('../controllers/seekerController');

const router = express.Router()



// BASE URL - /api/seeker/

router.get('/all-jobs', auth, getEveryJobs)
router.post('/apply-job/:id', auth,applyForJob)




module.exports = router
