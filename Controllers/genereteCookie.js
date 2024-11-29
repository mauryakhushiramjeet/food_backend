import jwt from "jsonwebtoken"
 export const genereteCookie=async(res,userId)=>{
    const token= jwt.sign({userId},process.env.JWT_SECERETE_KEY)
    res.cookie("token",token)
    return token;

}