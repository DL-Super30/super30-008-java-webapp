'use client'

import  { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from 'react-hook-form'
import axios from 'axios'

export default function Login() {
    // const [username,setUsername ] = useState('')
    // const [password , setPassword] = useState('')

    const router = useRouter();
    const {register , watch , handleSubmit , formState :{ errors}} = useForm();

    const validation = async (data) =>{
        const {username , password} = data;
        try{
            const response = await axios.post("http://localhost:3001/loginData",{
                username,
                password
            })
            if(response.data){
                toast.success('Login successfully', {
                    position: "top-right",
                    autoClose: 1800,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                    });
                setTimeout( () => {
                    router.push("/dashboard")
                },2000)
            }
            else{
                alert("failed")
            }
        }
        catch (err){
            console.log(err)
            toast.error('Invalid username or password ', {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
                });
        }
    }

    return (
        <div>
            <div>
            <ToastContainer />
                <form onSubmit={handleSubmit(validation)}>
                    <div className="w-6/12 h-svh  border-green-500">
                        <img className="m-auto mt-20" src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=640&q=75"></img>
                        <div className="w-[65%] h-[65%] border-2 border-gray-200 rounded-lg m-auto mt-10 p-8">
                            <label>User Name</label><br></br>
                            <input className="w-full p-2 border-2 border-gray-200 rounded-md  outline-none" {...register('username' ,{required : "username is required" })} />
                            {errors.username && <p className="text-red-500 ">{errors.username.message}</p>}
                            <label>Password</label><br></br>
                            <input className="w-full p-2 border-2 border-gray-200 rounded-md  outline-none" {...register('password',{required:"password is required"})} />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            <button type="submit" className="w-full p-2 border-2 border-gray-200 rounded-md  outline-none text-white loginclr" >Login</button>
                            <input className="scale-150" type="checkbox"></input>
                            <label className="ml-4">Remember Me</label><br></br>
                            <h3 className="mt-28 ml-28 text-gray-400">©2024, All rights reserved</h3><br></br>
                        </div>
                    </div>
                </form>
            </div>
            <div></div>
        </div>
    )
}
