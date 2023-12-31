// essential imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
require("dotenv/config")

// essential functions
app.use(cors({
    origin: '*'
}))

app.use(express.json({ limit: '50mb' }));
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to DB")
    }).
    catch((err) => console.log(err));





app.get('/', (req, res) => {
    res.send("Hello World")
}) 

// Application functions
app.use('/api/', require('./routes/userRoutes'))
app.use('/api/list-job', require('./routes/jobListing'))
app.use('/api/seeker', require('./routes/seekerRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))



// MiddleWares
// app.use(errorHandler)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Serving Alive and Running on ${process.env.PORT || 3000}`)
})