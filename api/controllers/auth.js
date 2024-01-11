import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const login = async(req,res) =>{
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    if(!userDoc) return res.status(400).json({msg : "Not Found"})
    const isMatch = await bcrypt.compare(password,userDoc.password)
    delete userDoc.password
    if(!isMatch) return res.status(400).json({msg:"Wrong Password"})
    else{
        jwt.sign({username,id:userDoc._id},process.env.JWT_SECRET,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json({
                id:userDoc._id,
                username,
                token
            });
        })
    }
}