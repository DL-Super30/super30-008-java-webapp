'use client'

import React from "react"
import { useForm } from "react-hook-form";

export default function Sample(){
    const {register,watch,handleSubmit,formState:{errors}} = useForm();

    const login = (data) =>{
        console.log(data);
    }

    return (
        <div className="pt-[100px]">
           <div className="w-1/3 border p-5 mx-auto">
           <form onSubmit={handleSubmit(login)}>
                <div>
                    <label>Email</label><br></br>
                    <input type="email" placeholder="email" className="w-full border p-1 rounded" {...register('email', {required:true,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/}) }></input>
                </div>
                {errors.email?.type==='required' && <p className="text-red-500">Please Enter Email Address</p>}
                {errors.email?.type==='pattern' && <p className="text-red-500">Enter Valid Email</p>}
                <div className="mt-5">
                    <label>Password</label><br></br>
                    <input type="password" placeholder="Password" className="border w-full p-1 rounded" {...register('Password',{required:true , minLength : 8})}></input>
                </div>
                {errors.password?.type==='required' && <p>please Enter Password</p>}
                {errors.password?.type === 'minLength' && <p>minimum 6 characters</p>}
                <button type="submit" className="w-36 p-1 border bg-blue-500 text-white mt-5 rounded">Submit</button>
            </form> 
           </div>
        </div>
    )
}