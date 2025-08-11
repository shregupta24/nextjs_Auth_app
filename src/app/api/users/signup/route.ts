import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest , NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json();
        const {username,password,email} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exist"},{status : 404})
        }

        //hashed password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            password : hashedPassword,
            email
        })
        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({message:"User Created successfully" ,success:true,savedUser })
        
    } catch (error : any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}