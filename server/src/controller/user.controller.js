import { User } from "../model/user.model.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

//user registration
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = User;

    const isExistedUser = await user.findOne({ email });

    if (isExistedUser) {
      return res.status(409).json({
        message: "User already exist",
      });
    }

    const hashedPwd = await bycrypt.hash(password, 10);

    const newUser = await user.create({
      username,
      email,
      password: hashedPwd,
    });

    return res.status(201).json({
      message: "User has been created",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

// user logIn
const logInUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email,password)

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isValidPassword = await bycrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { registerUser, logInUser };
