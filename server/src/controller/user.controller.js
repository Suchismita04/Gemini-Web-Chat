import { User } from "../model/user.model.js";
import bycrypt from 'bcrypt'



//user registration
const registerUser = async (req, res) => {

    const { username, email, password } = req.body

    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })

        }
        const user = User

        const isExistedUser = await user.findOne({ email })

        if (isExistedUser) {
            return res.status(409).json({
                message: "User already exist"
            })
        }

        const hashedPwd = await bycrypt.hash(password, 10)

        const newUser = await user.create({
            username,
            email,
            password: hashedPwd
        })

        return res.status(201).json({
            message: "User has been created",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email

            }

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "internal server error"
        })
    }
}




const logInUser= async (req,res)=>{
    const {email,password}=req.body

    try {
        if (!email || !password) {
            return res.status(400).json({
                message:"All fields are required"
            })
        }
     





    } catch (error) {
        
    }

}

export { registerUser,logInUser }