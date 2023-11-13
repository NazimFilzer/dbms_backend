const express = require('express');
const { editJob, deleteJob, createJob } = require('../controllers/jobListing');
const auth = require('../middlewares/auth');

const router = express.Router()



// BASE URL - /api/list-job

router.post('/create', auth, createJob)
router.post('/edit/:id', auth, editJob)
router.post('/delete/:id', auth, deleteJob)



module.exports = router
