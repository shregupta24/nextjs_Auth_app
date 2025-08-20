import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect()
export async function POST(req:NextRequest){
    try {
        const body = await req.json();
        const {email} = body;


    } catch (error) {
        return NextResponse.json({msg:"something wrong happened"} , {status: 500})
    }
}