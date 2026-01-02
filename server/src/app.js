import express from 'express'
import cors from 'cors'
import {userRouter} from "./route/user.route.js"


const app= express()
app.use(cors({
origin:process.env.ORIGIN_URL,
credentials:true
}))
app.use(express.json())


app.use('/api/v1',userRouter)
export default app