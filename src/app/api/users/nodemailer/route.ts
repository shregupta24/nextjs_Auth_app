import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest , NextResponse } from "next/server";

connect()

export async function POST(request : NextRequest){
    try {
       const reqBody = await request.json() 
       const {token} = reqBody
       console.log(token);

       const user = await User.findOne({verifyToken : token,verifyTokenExpiry : {$gt : Date.now()}})
        console.log(user);
       if(!user){
        return NextResponse.json({message : "Invalid Token"},{status:404})
       }

       user.isVerified = true;
       user.verifyToken = undefined;
       user.verifyTokenExpiry = undefined;
       await user.save();

       return NextResponse.json({message:"User verified successfully"},{status:200})
    } catch (error : any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}