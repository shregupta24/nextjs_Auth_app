"use client"
import axios from "axios"
import {useRouter} from "next/navigation"
import { useState } from "react"
import toast, { Toast } from "react-hot-toast"
import Link from "next/link"
export default function profilePage(){
    const router = useRouter()

    const[data,setData] = useState("Nothing")

    const getUserDetails = async() =>{
        const res = await axios.get("/api/users/me")
        console.log(res.data)
        setData(res.data.data._id)
    }
    const logout = async ()=>{
        await axios.get("/api/users/logout")
        toast.success("Logout successful")
        router.push("/login")
    }
    return (
        <div>
            Profile page
            <h2 className="padding text-3xl text-gray-700">{data === 'Nothing' ?"Nothing" :<Link href = {`/profile/${data}`}>{data}</Link> }</h2> 
            <hr />
            <button onClick={logout}
            className = "mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
            <button onClick={getUserDetails}
            className = "mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Get User Details
            </button>
        </div>
    )
}