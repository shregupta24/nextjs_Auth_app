"use client"

import axios from "axios"
import { useState } from "react"

export default function forgetPassword(){
    const[email,setEmail]=useState("")
    const forgetPass = async()=>{
        const response = await axios.post("/api/users/forgetPassword",email)
    }
    return (
        <div>
                <h1>Reset your Password</h1>
                <label htmlFor="email">Enter your email id</label>
                <input 
                    type="text"
                    id = "email"
                    className="border border-black"
                    onChange={(e) => setEmail(e.target.value)}
                    value ={email}
                />
                <br></br>
                <button onClick={forgetPass}>Send Email</button>
        </div>
    )
}