const express = require('express');
const { editJob, deleteJob, createJob,getAllJobs,getSpecificJob,getApplication } = require('../controllers/jobListing');
const auth = require('../middlewares/auth');

const router = express.Router()



// BASE URL - /api/list-job

router.get('/',auth, getAllJobs)
router.get('/:id',auth, getSpecificJob)
router.post('/create', auth, createJob)
router.post('/edit/:id', auth, editJob)
router.post('/delete/:id', auth, deleteJob)

// recruiter
router.get('/application/:id', auth, getApplication)



module.exports = router
