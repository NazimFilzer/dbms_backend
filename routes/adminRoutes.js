const express = require('express');
const auth = require('../middlewares/auth');
const { getEveryJobs, deleteJob, getAllUsers,login,signup } = require('../controllers/adminController');

const router = express.Router()



// BASE URL - /api/admin/

router.post('/login', login)
router.post('/signup', signup)

router.get('/all-jobs', auth, getEveryJobs)
router.post('/delete/:id', auth, deleteJob)

router.get('/users',getAllUsers)






module.exports = router
