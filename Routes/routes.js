import express from "express"
const router=express.Router()
import { logIn, logout, signUp } from "../Controllers/authenTication.js"
router.post("/signup",signUp)
router.post("/login",logIn)
router.post("/logout",logout)
export default router