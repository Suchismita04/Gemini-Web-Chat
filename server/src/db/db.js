import mongoose from 'mongoose'


const connectionDb = async () => {
  
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}`)
        console.log(`Mongo DB is successfully connected!!! ${connectionInstance.connection.host}`)
    } catch (error) {
         console.log("Mongo DB connection is failed",error)
         console.log(`${process.env.DB_URL}`)
         process.exit(1)
    }

}
export default connectionDb