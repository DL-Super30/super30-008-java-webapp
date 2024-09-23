'use client'

import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const [records,setRecords] = useState([])
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const  router  = useRouter();

    // const { router } = useRouter;

    useEffect( () =>{
        fetchData();
        
    },[] )

    const fetchData =async () =>{
        try{
            const response  = await fetch("http://localhost:3001/loginData");
        const data = await response.json()
        console.log(data)
        setRecords(data)
    }
        catch (err){
            console.log(err)
        }
    }

    const validate = () =>{
        const validUser = records.find( (ele) => ele.username == username && ele.password == password )
        if(validUser){
            console.log("succesfully login !!!")
            // alert("successfully login !")
            toast.success('Login Succesfully !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
                });
            setTimeout( () => {
            router.push('/dashboard')
            } ,2000)

            setUserName("")
            setPassword("")
        }
        else{
            console.log("incorrect password !");
            // alert("invalid details !")
            toast.error('invalid details !', {
                position: "top-right",
                autoClose: 2000,
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
        <div className="w-full h-svh flex">
            <div className=" w-6/12 h-svh ">
                <img className="m-auto mt-28 mb-8" src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=640&q=75" ></img>
                <div className="w-[65%] border-2 border-gray h-[60%] m-auto rounded-lg p-8">
                    <label >User Name</label><br></br>
                    <input className="w-full border-2 border-gray p-2 m-auto rounded-lg outline-none mb-5" value={username} onChange={(e) =>setUserName(e.target.value) } ></input><br></br>
                    <label>Password</label><br></br>
                    <input className="w-full border-2 border-gray p-2 m-auto rounded-lg outline-none mb-8" value={password} onChange={(f) => setPassword(f.target.value)}></input><br></br>
                    <button className="w-full  p-2 m-auto rounded-lg outline-none mb-7 login " onClick={validate}> Login</button>
                    <div className="flex gap-x-5">
                        <input type="checkbox" className="scale-150 "></input><p className="text-gray-600">Remember Me</p>
                    </div>
                    <p className="mt-24 ml-28 text-gray-600">©2024, All rights reserved</p>
                </div>
            </div>
            <div className=" w-6/12 h-svh  ">
                    <div className="h-[26.5%]"> 
                    <h1 className="font-black text-3xl text-center mt-12 fontfamili text-[#042D60]">Seamlessly manage all learner data<br></br> in a unified platform.</h1>
                    <p className="text-center mt-8">Centralize customer data effortlessly. Streamline communication, sales, <br></br>and support for seamless growth.</p>

                    </div>
                    <div className="backgroundimg h-[68%]"></div>

            </div>
            <ToastContainer />
        </div>
    )
}