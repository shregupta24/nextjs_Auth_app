"use client" ;
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {axios} from "axios"

export default function signUpPage(){
    const [user,setUser] = useState({
        email :"",
        password :"",
        username :""
    })

    const onSignUp = async() =>{
        
    }

    return (
        <div className = "flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>Signup Page</h1>
            <label htmlFor="username"> Username </label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) =>setUser({...user,username : e.target.value})} 
            />
            <label htmlFor="email"> email </label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text"
                placeholder="email"
                value={user.email}
                onChange={(e) =>setUser({...user,email : e.target.value})} 
            />
            <label htmlFor="password"> password </label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) =>setUser({...user,password : e.target.value})} 
            />
            <button onClick={onSignUp}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                SignUp here
            </button>
            <Link href = "/login">Visit Login page here</Link>
        </div>

    )
}