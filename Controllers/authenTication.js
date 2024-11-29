import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { genereteCookie } from "./genereteCookie.js";
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Ensure all fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the user already exists
    const userAlready = await userModel.findOne({ email });
    if (userAlready) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      email,
      password: hashPassword,
    });

    // Save the new user
    await user.save();
    genereteCookie(res, user._id);

    // Respond with the newly created user (or just send a success message)
    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `An error occurred during signup: ${error.message}`,
    });
  }
};
export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Ensure both email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Password not matched" });
    }

    // Generate and set the JWT token as a cookie
    genereteCookie(res, user._id);

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `An error occurred during login: ${error.message}`,
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ sucess: true, message: "User LogOut successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
