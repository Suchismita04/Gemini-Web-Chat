import dotenv from 'dotenv'
import app from './app.js'
import connectionDb from './db/db.js'



dotenv.config({ path: './.env' })


connectionDb()
    .then(() => {
        app.listen(process.env.PORT || 3000)
        console.log(`Server is running on port ${process.env.PORT}`)
    })
    .catch((err) => {
        console.log("Mongo Connection is failed", err)
    })