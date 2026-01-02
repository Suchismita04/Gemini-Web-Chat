import express from 'express'
import cors from 'cors'


const app= express()
app.use(cors({
origin:process.env.ORIGIN_URL,
credentials:true
}))
app.use(express.json())



export default app