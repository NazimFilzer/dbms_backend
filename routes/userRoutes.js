const express = require('express')
const { login, signup, signupComp, loginComp } = require('../controllers/user/userAuth')
const router = express.Router()



// BASE URL - /api/

router.post('/seeker/signup', signup)
router.post('/seeker/login', login)

router.post('/company/signup', signupComp)
router.post('/company/login', loginComp)

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong' })
        }
        res.status(200).json({ message: 'User logged out successfully' })
    })
})
module.exports = router
