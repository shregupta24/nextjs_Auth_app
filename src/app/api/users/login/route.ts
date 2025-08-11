
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { error } from "console";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbconfig";
const jwt = require("jsonwebtoken");
connect()
export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const{email,password} = reqBody;
        console.log(reqBody)
        //check if user exist

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error : "User doesn't exist"} , {status : 404})
        }

        //check for password
        const ValidPassword = await bcryptjs.compare(password,user.password)
        if(!ValidPassword) {
            return NextResponse.json({error:"Incorrect Password"} , {status:404})
        }

        const tokenData = {
            id:user._id,
            username : user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET , {expiresIn : "1d"})
        
        const response = NextResponse.json({message:"User logged in successfully!"} , {status:200})
        response.cookies.set("token" , token , {
            httpOnly : true
        })

        return response;
    } catch (error : any) {
        console.log("something went wrong" , error)
        return NextResponse.json({error:error.message},{status:500})
    }
}