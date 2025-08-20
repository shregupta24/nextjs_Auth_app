"use client" ;
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";

export default function SignUpPage(){

    const router = useRouter();
    const [user,setUser] = useState({
        email :"",
        password :"",
        username :""
    })
    const[buttonDisable,setButtonDisable] = useState(false);
    const[loading,setLoading] = useState(false);
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisable(false)
        }
        else{
            setButtonDisable(true)
        }
    },[user])
    const onSignUp = async() =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("user signed up successfully",response.data);
            router.push("/login")

        } catch (error : any) {
            console.log("SignUp error", error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className = "flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>{loading ? "processing" : "SignUp" }</h1>
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
                {buttonDisable ? "No signup": "SignUp"}
            </button>
            <Link href = "/login">Visit Login page here</Link>
        </div>

    )
}